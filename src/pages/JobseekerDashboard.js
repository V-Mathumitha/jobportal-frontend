import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobseekerDashboard.css";

export default function JobseekerDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const fullName = user?.fullName || "Jobseeker";

  // Sample counts for cards
  const [jobsCount, setJobsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);

  // Fake fetch to simulate loading counts (replace with API later)
  useEffect(() => {
    setJobsCount(12); // example
    setApplicationsCount(5); // example
  }, []);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#0d6efd",
          color: "white",
          padding: "20px",
        }}
      >
        <h4 className="mb-4">Jobseeker</h4>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link
              to="/jobseeker/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              🏠 Dashboard
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/jobseeker/profile"
              style={{ color: "white", textDecoration: "none" }}
            >
              👤 My Profile
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/jobseeker/applyjobs"
              style={{ color: "white", textDecoration: "none" }}
            >
              📝 Apply Jobs
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/applications"
              style={{ color: "white", textDecoration: "none" }}
            >
              📄 My Applications
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/resumes"
              style={{ color: "white", textDecoration: "none" }}
            >
              📂 My Resumes
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>
          Welcome{" "}
          <span style={{ color: "#0d6efd" }}>
            {fullName}
          </span>
          !
        </h2>

        {/* Cards */}
        <div className="row mt-4">
          <div className="col-md-4 mb-3">
            <div className="card shadow p-3">
              <h5>Total Jobs</h5>
              <p className="fs-4">{jobsCount}</p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card shadow p-3">
              <h5>My Applications</h5>
              <p className="fs-4">{applicationsCount}</p>
            </div>
          </div>
        </div>

        {/* Optional content / placeholder */}
        <div className="mt-4">
          <h4>Dashboard Content</h4>
          <p>This is where job listings, updates, or notifications can appear.</p>
        </div>
      </div>
    </div>
  );
}
