import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ApplyJobs() {
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  // Correctly wrap token in template literal
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5270/api/JobListing",
          config
        );
        setJobs(response.data);
      } catch (err) {
        console.error("Failed to load jobs.", err);
        setMessage("Failed to load jobs.");
      }
    };

    fetchJobs();
  }, []); // No need to include config in dependency array

  return (
    <div className="container mt-4">
      <h2>Available Jobs</h2>
      {message && <div className="alert alert-danger">{message}</div>}

      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        <div className="list-group">
          {jobs.map((job) => (
            <div
              key={job.jobListingId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{job.title}</h5>
                <p className="mb-0">
                  <strong>Company:</strong> {job.employerName || "N/A"}
                </p>
                <p className="mb-0">
                  <strong>Location:</strong> {job.location}
                </p>
              </div>
              <Link
                to={`/jobseeker/jobdetail/${job.jobListingId}`}
                className="btn btn-primary"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
