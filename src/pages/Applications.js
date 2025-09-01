import React, { useEffect, useState } from "react";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  // Hardcoded for now → later you’ll fetch logged-in employerId from localStorage / auth
  const employerId = 1;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5064/api/Application/employer/" + employerId
        );

        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications", err);
        setError("Failed to load applications.");
      }
    };

    fetchApplications();
  }, [employerId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Job Applications</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Application ID</th>
            <th>Job Title</th>
            <th>Applicant Name</th>
            <th>Status</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app.applicationId}>
                <td>{app.applicationId}</td>
                <td>{app.jobTitle}</td>
                <td>{app.applicantName}</td>
                <td>{app.status}</td>
                <td>
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    View Resume
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Applications;
