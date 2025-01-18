import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FeedbackForm.css';
import feedbackImg from '../assets/in.jpg';
import axios from 'axios';

function FeedbackForm() {
  const { id } = useParams();
  const [feedbackData, setFeedbackData] = useState(null);
  const [isToday, setIsToday] = useState(false);
  const [isFeedbackActive, setIsFeedbackActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specificTopic: '',
    improvement: '',
    rating: 0
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback/feedbacks/${id}`);
        setFeedbackData(response.data);

        const today = new Date().toISOString().split('T')[0];
        const startDate = new Date(response.data.startdate).toISOString().split('T')[0];
        const endDate = new Date(response.data.enddate).toISOString().split('T')[0];

        if (today >= startDate && today <= endDate) {
          setIsFeedbackActive(true);
          setIsToday(endDate === today); 
        } else {
          setIsFeedbackActive(false);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackType = isToday ? 'public' : 'anonymous';
    const feedbackPayload = {
      specificTopic: formData.specificTopic,
      improvement: formData.improvement,
      rating: formData.rating,
      feedbackType,
      ...(feedbackType === 'public' && {
        name: formData.name,
        email: formData.email
      })
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/feedback/feedbacks/${id}/submit`, feedbackPayload);
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback');
    }
  };

  if (!feedbackData) return <div>Loading...</div>;
  if (!isFeedbackActive) return <div>Feedback is not available at this time.</div>;

  return (
    <div className="feedback-container">
      <div className="feedback-image">
        <img src={feedbackImg} alt="Feedback Illustration" />
      </div>

      <div className="feedback-form">
        <h2>Your feedback fuels the future of learning tomorrow!</h2>
        <form onSubmit={handleSubmit}>
          {isToday && (
            <div className="name-email-group">
              <div className="form-group">
                <label htmlFor="name">Your Name <span>*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email <span>*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="specific-topic">Any Specific Topic required during the training <span>*</span></label>
            <textarea
              id="specific-topic"
              name="specificTopic"
              value={formData.specificTopic}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="improvement">Anything to improve?</label>
            <textarea
              id="improvement"
              name="improvement"
              value={formData.improvement}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
