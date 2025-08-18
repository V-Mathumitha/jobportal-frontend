"use client";

import { useState } from "react";
import { registerUser } from "../services/authService";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userData = { email, password, role };
      const response = await registerUser(userData);

      setSuccess(response.message || "Registration successful! 🎉");
      console.log("Registered:", response);

      // clear fields
      setEmail("");
      setPassword("");
      setRole("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      {/* Header */}
      <div className="header">CareerCrafter</div>

      {/* Main container */}
      <div className="register-container">
        {/* Left side image */}
        <div className="register-left">
          <img src="/images/job1.jpg" alt="Job Portal" />
        </div>

        {/* Right side form */}
        <div className="register-right">
          <div className="register-box">
            <h2>Register</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">-- Select Role --</option>
                <option value="Jobseeker">Jobseeker</option>
                <option value="Employer">Employer</option>
              </select>

              <button type="submit">Register</button>
            </form>

            <div className="switch-text">
              Already have an account? <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
