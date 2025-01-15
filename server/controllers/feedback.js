const feedbackmodel = require("../models/feedbackschema");
const collegemodel = require("../models/collegeschema");

const addfeedback = async (req, res) => {
    try {
      const { title, college_id, departments, days, tutors, sessionname, startdate, enddate } = req.body;
console.log(req.body)
      if (!days) {
        return res.status(400).json({ error: 'Days field is missing' });
      }

      // Use feedbackmodel instead of Feedback
      const feedback = new feedbackmodel({
        sessionname,
        college_id,
        departments,
        days,
        tutors,
        status: 'Active',
        startdate,
        enddate,
        link: `https://feedback.example.com/${Math.random().toString(36).substring(7)}`,
      });

      await feedback.save();
      res.status(201).json({ message: 'Feedback added successfully', feedback });
    } catch (err) {
      console.error('Error occurred:', err);
      res.status(500).json({ error: 'An error occurred while adding feedback' });
    }
};

  

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackmodel.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

const updatefeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const updates = req.body;
    console.log(req.body)

    const feedback = await feedbackmodel.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    Object.keys(updates).forEach((key) => {
      feedback[key] = updates[key];
    });

    await feedback.save();
    res.status(200).json({ message: "Feedback updated successfully", feedback });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Delete Feedback
const deletefeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    const feedback = await feedbackmodel.findByIdAndDelete(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully", feedback });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = { addfeedback, updatefeedback, deletefeedback, getFeedbacks };
