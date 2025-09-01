import axios from "axios";

const API_URL = "http://localhost:5270/api/Application";

const getConfig = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const ApplicationService = {
  applyToJob: async (jobListingId, jobSeekerId) => {
    return axios.post(
      API_URL,
      { jobListingId, jobSeekerId },
      getConfig()
    );
  },

  getApplicationsByJobSeeker: async (jobSeekerId) => {
    return axios.get(`${API_URL}/ByJobSeeker/${jobSeekerId}`, getConfig());
  },

  getApplicationsByJob: async (jobListingId) => {
    return axios.get(`${API_URL}/ByJob/${jobListingId}`, getConfig());
  },

  getApplicationsByEmployer: async (employerId) => {
    return axios.get(`${API_URL}/ByEmployer/${employerId}`, getConfig());
  },
};

export default ApplicationService;
