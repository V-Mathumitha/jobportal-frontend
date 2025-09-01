import axios from "axios";

const API_URL = "http://localhost:5270/api";

// ✅ Get all jobs posted by a specific employer
export function getJobsByEmployer(employerId) {
  return axios
    .get(API_URL + "/JobListing/ByEmployer/" + employerId)
    .then((res) => res.data);
}

// ✅ Post a new job
export function postJob(jobData) {
  return axios
    .post(API_URL + "/JobListing", jobData)
    .then((res) => res.data);
}

// ✅ Update existing job by ID
export function updateJob(id, jobData) {
  return axios
    .put(API_URL + "/JobListing/" + id, jobData)
    .then((res) => res.data);
}

// ✅ Delete a job (no res.data because backend usually returns 204 No Content)
export function deleteJob(id) {
  return axios.delete(API_URL + "/JobListing/" + id);
}

// ✅ Get job details by ID
export function getJobById(id) {
  return axios
    .get(API_URL + "/JobListing/" + id)
    .then((res) => res.data);
}

// ✅ Get all applications for jobs of an employer
export function getApplicationsByEmployer(employerId) {
  return axios
    .get(API_URL + "/Application/ByEmployer/" + employerId)
    .then((res) => res.data);
}
