import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageJobs.css";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
  });

  const getToken = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      return storedUser?.token || localStorage.getItem("token");
    } catch {
      return localStorage.getItem("token");
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchJobs = async () => {
      setLoading(true);
      setMsg("");
      try {
        const token = getToken();
        const { data } = await axios.get(
          "http://localhost:5270/api/JobListing/ByEmployer",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const list = Array.isArray(data) ? data : data?.data ?? data?.$values ?? [];
        if (!ignore) setJobs(list);
      } catch (err) {
        if (!ignore) setMsg("Failed to load jobs.");
        console.error("Error fetching jobs:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchJobs();
    return () => { ignore = true; };
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      const token = getToken();
      await axios.delete(`http://localhost:5270/api/JobListing/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(prev => prev.filter(j => j.jobListingId !== id));
      setMsg("Job deleted.");
    } catch (err) {
      setMsg("Failed to delete job.");
      console.error("Error deleting job:", err);
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    // Map skills array of strings from backend
    setFormData({
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      skills: job.skills?.join(", ") || "",
    });
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const token = getToken();
      const updatedJob = {
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()).filter(s => s),
      };

      await axios.put(
        `http://localhost:5270/api/JobListing/${editingJob.jobListingId}`,
        updatedJob,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update frontend list
      setJobs(prev =>
        prev.map(j => j.jobListingId === editingJob.jobListingId
          ? { ...j, ...updatedJob }
          : j
        )
      );
      setEditingJob(null);
      setMsg("Job updated.");
    } catch (err) {
      setMsg("Failed to update job.");
      console.error("Error updating job:", err);
    }
  };

  if (loading) return <p className="container mt-4">Loading jobs...</p>;

  return (
    <div className="container mt-4">
      <h2 className="manage-jobs-header mb-4">Manage Jobs</h2>
      {msg && <div className="alert alert-info mt-2">{msg}</div>}

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="list-group">
          {jobs.map((job) => (
            <div
              key={job.jobListingId}
              className="list-group-item mb-3 p-3 border rounded shadow-sm d-flex justify-content-between"
            >
              <div className="job-details">
                {editingJob?.jobListingId === job.jobListingId ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      placeholder="Title"
                      className="form-control mb-2"
                    />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="Description"
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      placeholder="Location"
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleFormChange}
                      placeholder="Salary"
                      className="form-control mb-2"
                    />
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleFormChange}
                      placeholder="Skills (comma separated)"
                      className="form-control mb-2"
                    />
                    <div className="d-flex mt-2" style={{ gap: "8px" }}>
                      <button className="btn btn-sm btn-primary" onClick={handleUpdate}>
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-cancel"
                        onClick={() => setEditingJob(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h5 className="mb-2">{job.title}</h5>
                    <p className="mb-1">{job.description}</p>
                    <p className="mb-1"><strong>Location:</strong> {job.location}</p>
                    <p className="mb-1"><strong>Salary:</strong> {job.salary}</p>
                    {job.skills && job.skills.length > 0 && (
                      <p className="mb-1"><strong>Skills:</strong> {job.skills.join(", ")}</p>
                    )}
                    {job.postedOn && (
                      <p className="mb-1"><strong>Posted:</strong> {new Date(job.postedOn).toLocaleDateString()}</p>
                    )}
                  </>
                )}
              </div>

              {editingJob?.jobListingId !== job.jobListingId && (
                <div className="d-flex flex-column justify-content-start ms-3">
                  <button
                    className="btn btn-outline-primary btn-sm mb-2"
                    style={{ padding: "0.35rem 0.75rem" }}
                    onClick={() => handleEditClick(job)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    style={{ padding: "0.35rem 0.75rem" }}
                    onClick={() => handleDelete(job.jobListingId)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
