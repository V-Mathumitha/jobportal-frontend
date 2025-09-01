import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlus,
  FaBuilding,
  FaCog,
  FaBriefcase,
  FaUsers,
  FaUserCheck,
  FaTasks,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function EmployerDashboard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [applications, setApplications] = useState(0);
  const [shortlisted, setShortlisted] = useState(0);
  const [recentApps, setRecentApps] = useState([]);

  const employerId = localStorage.getItem("employerId"); // ✅ from login storage
  const COLORS = ["#28a745", "#226BFF"];

  useEffect(() => {
    async function fetchDashboard() {
      try {
        // ✅ Fetch jobs for this employer using JWT token
        const token = localStorage.getItem("token");
        const jobRes = await fetch(`http://localhost:5270/api/joblisting/ByEmployer`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const employerJobs = jobRes.ok ? await jobRes.json() : [];

        setTotalJobs(employerJobs.length);
        setActiveJobs(employerJobs.length); // no separate status, all counted

        // Fetch applications for each job
        let allApps = [];
        for (let job of employerJobs) {
          const appsRes = await fetch(
            `http://localhost:5270/api/application/ByJob/${job.jobListingId}`
          );
          if (appsRes.ok) {
            const jobApps = await appsRes.json();
            allApps = [...allApps, ...(jobApps || [])];
          }
        }

        setApplications(allApps.length);
        setShortlisted(allApps.filter((a) => a.status === "Shortlisted").length);

        // Sort recent applications
        const sorted = allApps.sort(
          (a, b) => new Date(b.appliedOn) - new Date(a.appliedOn)
        );
        setRecentApps(sorted.slice(0, 5));
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      }
    }

    if (employerId) fetchDashboard();
  }, [employerId]);

  const chartData = [
    { name: "Shortlisted", value: shortlisted },
    { name: "Others", value: Math.max(applications - shortlisted, 0) },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="p-3 vh-100"
        style={{ width: "250px", background: "#226BFF", color: "white" }}
      >
        <h4 className="mb-4">CareerCrafter</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              to="/employer/dashboard"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaHome className="me-2" /> Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/employer/post-job"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaPlus className="me-2" /> Post a New Job
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/employer/manage-jobs"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaTasks className="me-2" /> Manage Jobs
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/employer/applications"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaUsers className="me-2" /> Applications
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/employer/company"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaBuilding className="me-2" /> Company Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/employer/settings"
              className="nav-link text-white d-flex align-items-center"
            >
              <FaCog className="me-2" /> Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: "#2c3e50" }}>Employer Dashboard</h2>
          <div>
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {localStorage.getItem("employerName") || localStorage.getItem("userEmail") || "Employer"}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/employer/settings">
                  Profile / Settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div
              className="card text-center shadow-sm border-0"
              style={{ background: "#f0f5ff" }}
            >
              <div className="card-body">
                <FaBriefcase size={30} className="text-primary mb-2" />
                <h5>Total Jobs</h5>
                <h3>{totalJobs}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card text-center shadow-sm border-0"
              style={{ background: "#f0f5ff" }}
            >
              <div className="card-body">
                <FaBriefcase size={30} className="text-success mb-2" />
                <h5>Active Jobs</h5>
                <h3>{activeJobs}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card text-center shadow-sm border-0"
              style={{ background: "#f0f5ff" }}
            >
              <div className="card-body">
                <FaUsers size={30} className="text-info mb-2" />
                <h5>Applications</h5>
                <h3>{applications}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card text-center shadow-sm border-0"
              style={{ background: "#f0f5ff" }}
            >
              <div className="card-body">
                <FaUserCheck size={30} className="text-warning mb-2" />
                <h5>Shortlisted</h5>
                <h3>{shortlisted}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="card shadow-sm mb-4">
          <div className="card-header">Applications Overview</div>
          <div className="card-body" style={{ minHeight: 260 }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applications Table */}
        <div className="card shadow-sm">
          <div className="card-header">Recent Applications</div>
          <div className="card-body">
            {recentApps.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Job Title</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApps.map((app, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src="/images/avatar.png"
                          alt="profile"
                          width="30"
                          className="me-2 rounded-circle"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              "https://via.placeholder.com/30";
                          }}
                        />
                        {app.jobSeeker?.name || app.jobSeeker?.email}
                      </td>
                      <td>{app.jobListing?.title}</td>
                      <td>{new Date(app.appliedOn).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            app.status === "Shortlisted"
                              ? "bg-success"
                              : app.status === "Rejected"
                              ? "bg-danger"
                              : "bg-warning"
                          }`}
                        >
                          {app.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary me-1">
                          View
                        </button>
                        <button className="btn btn-sm btn-outline-success me-1">
                          ✔
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          ✖
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted text-center mt-2">
                No applications yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
