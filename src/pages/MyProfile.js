import { useEffect, useState } from "react";
import axios from "axios";

export default function MyProfile() {
  const [profile, setProfile] = useState({
    fullname: "",
    gender: "",
    photograph: "",
    skills: "",
    education: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5270/api/JobSeeker/me",
          config
        );
        setProfile(response.data);
      } catch (err) {
        console.log("No profile found yet.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5270/api/JobSeeker/me", profile, config);
      setMessage("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile", err);
      setMessage("Failed to update profile");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>
      {message && <div className="alert alert-info">{message}</div>}

      {!editing ? (
        <div>
          <p><strong>Full Name:</strong> {profile.fullname}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Photograph:</strong> {profile.photograph}</p>
          <p><strong>Skills:</strong> {profile.skills}</p>
          <p><strong>Education:</strong> {profile.education}</p>
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              name="fullname"
              value={profile.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <input
              type="text"
              className="form-control"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Photograph</label>
            <input
              type="text"
              className="form-control"
              name="photograph"
              value={profile.photograph}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Skills</label>
            <input
              type="text"
              className="form-control"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Education</label>
            <input
              type="text"
              className="form-control"
              name="education"
              value={profile.education}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
