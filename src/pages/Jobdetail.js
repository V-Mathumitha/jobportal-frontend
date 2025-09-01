import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApplicationService from "../services/applicationService";
import axios from "axios";

export default function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const jobSeekerId = user?.jobseekerId;

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5270/api/JobListing/${jobId}`,
          config
        );
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching job details", err);
      }
    };
    fetchJob();
  }, [jobId, config]);

  const handleApply = async () => {
    if (!jobSeekerId) return setMessage("Please login as Jobseeker to apply.");

    try {
      await ApplicationService.applyToJob(jobId, jobSeekerId);
      setMessage("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit application.");
    }
  };

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="container mt-4">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.employer?.companyName || job.employerName || "N/A"}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong> {job.description}</p>

      {message && <div className="alert alert-info">{message}</div>}

      <button className="btn btn-primary" onClick={handleApply}>
        Apply Now
      </button>
    </div>
  );
}
