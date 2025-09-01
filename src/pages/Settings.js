import { useState, useEffect } from "react";

export default function EmployerSettings() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load stored name (if any) from localStorage
    const storedName = localStorage.getItem("employerName");
    if (storedName) setName(storedName);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage("⚠️ Name cannot be empty.");
      return;
    }

    // Save employer name in localStorage
    localStorage.setItem("employerName", name.trim());
    setMessage("✅ Name updated successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Settings</h4>
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
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
