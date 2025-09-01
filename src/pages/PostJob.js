import { useState, useEffect } from "react";

export default function PostJob({ addJobToList = (job) => console.log("New job added:", job) }) {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch companies for dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5270/api/company");
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = await res.json();
        setCompanies(data); // set companies for dropdown
      } catch (err) {
        console.error(err);
        setMessage("⚠️ Unable to load companies.");
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = storedUser?.token;

      if (!token) {
        setMessage("⚠️ Please login first.");
        setLoading(false);
        return;
      }

      const skillsArray = jobData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);

      const response = await fetch("http://localhost:5270/api/JobListing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: jobData.title,
          description: jobData.description,
          location: jobData.location,
          salary: parseFloat(jobData.salary),
          skills: skillsArray,
          companyId: parseInt(jobData.companyId),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("✅ Job posted successfully!");

        addJobToList({
          ...jobData,
          jobListingId: Date.now(), // temporary ID for frontend
          postedOn: new Date().toISOString(),
          skills: skillsArray,
        });

        setJobData({
          title: "",
          description: "",
          location: "",
          salary: "",
          skills: "",
          companyId: "",
        });

        console.log("API Response:", data);
      } else {
        const errorText = await response.text();
        setMessage("❌ Failed to post job: " + errorText);
      }
    } catch (err) {
      setMessage("⚠️ Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Post a New Job</h4>
            </div>
            <div className="card-body">
              {message && (
                <div
                  className={`alert ${
                    message.startsWith("✅") ? "alert-success" : "alert-danger"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  placeholder="Job Title"
                  className="form-control mb-2"
                  required
                />
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  placeholder="Job Description"
                  className="form-control mb-2"
                  rows="3"
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="form-control mb-2"
                  required
                />
                <input
                  type="number"
                  name="salary"
                  value={jobData.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  className="form-control mb-2"
                  required
                />
                <select
                  name="companyId"
                  value={jobData.companyId}
                  onChange={handleChange}
                  className="form-control mb-2"
                  required
                >
                  <option value="">-- Select Company --</option>
                  {companies.map((c) => (
                    <option key={c.companyId} value={c.companyId}>
                      {c.companyName}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="skills"
                  value={jobData.skills}
                  onChange={handleChange}
                  placeholder="Skills (comma separated)"
                  className="form-control mb-2"
                />
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Posting..." : "Post Job"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
