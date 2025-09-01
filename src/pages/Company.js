import React, { useState, useEffect } from "react";

function Company() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    companyName: "",
    location: "",
    industry: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch companies on mount
  useEffect(() => {
    fetch("http://localhost:5270/api/company")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const handleChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5270/api/company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCompany),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add company");
        return res.json();
      })
      .then((data) => {
        setCompanies([...companies, data]);
        setNewCompany({ companyName: "", location: "", industry: "" });
        setMessage("✅ Company added successfully!");
        setError("");
        setTimeout(() => setMessage(""), 3000); // auto hide
      })
      .catch((err) => {
        setError("❌ Error adding company. Try again.");
        setMessage("");
        setTimeout(() => setError(""), 3000);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Company Management</h2>

      {/* ✅ Notifications */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Add Company Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            name="companyName"
            value={newCompany.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="location"
            value={newCompany.location}
            onChange={handleChange}
            placeholder="Location"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="industry"
            value={newCompany.industry}
            onChange={handleChange}
            placeholder="Industry"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Company
        </button>
      </form>

      {/* Display Companies in Table Layout */}
      <table className="table table-bordered table-striped mt-4">
        <thead className="table-dark">
          <tr>
            <th>Company ID</th>
            <th>Company Name</th>
            <th>Industry</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.companyId}>
              <td>{company.companyId}</td>
              <td>{company.companyName}</td>
              <td>{company.industry}</td>
              <td>{company.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Company;
