import axios from 'axios';

const API_URL = 'http://localhost:5000/quizzes';

export const getQuizzes = () => {
  return axios.get(API_URL);
};

export const getQuizById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};