import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const addCollege = async (collegeData) => {
  const response = await api.post('/college/addcollege', collegeData);
  return response.data;
};

export const updateCollege = async (collegeId, collegeData) => {
  const response = await api.post(`/college/updatecollege/${collegeId}`, collegeData);
  return response.data;
};

export const deleteCollege = async (collegeId) => {
  const response = await api.post(`/college/deletecollege/${collegeId}`);
  return response.data;
};

export const addFeedback = async (feedbackData) => {
  const response = await api.post('/feedback/addfeedback', feedbackData);
  return response.data;
};

export const updateFeedback = async (feedbackId, feedbackData) => {
  const response = await api.post(`/feedback/updatefeedback/${feedbackId}`, feedbackData);
  return response.data;
};

export const deleteFeedback = async (feedbackId) => {
  const response = await api.post(`/feedback/deletefeedback/${feedbackId}`);
  return response.data;
};

export const addFeedbackContent = async (feedbackData) => {
  const response = await api.post('/feedback/addfeedbackcontent', feedbackData);
  return response.data;
};

export default api;