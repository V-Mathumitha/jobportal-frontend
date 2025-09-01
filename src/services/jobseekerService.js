// src/services/jobseekerService.js
import axios from "axios";

const API_URL = "http://localhost:5270/api/JobSeeker"; // backend base url

// Get all jobseekers
export const getAllJobSeekers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get jobseeker by Id
export const getJobSeekerById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Get jobseeker by UserId
export const getJobSeekerByUserId = async (userId) => {
  const response = await axios.get(`${API_URL}/User/${userId}`);
  return response.data;
};

// Add new jobseeker
export const addJobSeeker = async (jobseeker) => {
  const response = await axios.post(API_URL, jobseeker);
  return response.data;
};

// Update jobseeker
export const updateJobSeeker = async (id, jobseeker) => {
  const response = await axios.put(`${API_URL}/${id}`, jobseeker);
  return response.data;
};
