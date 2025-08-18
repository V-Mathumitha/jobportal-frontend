'use client';

import { useState } from "react";
import { loginUser } from "../services/authService";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      setMessage("Login successful ✅");
      console.log("Login response:", response);

      // store token/role if backend returns it
      // localStorage.setItem("user", JSON.stringify(response));
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      {/* Header */}
      <div className="header">CareerCrafter</div>

      {/* Content */}
      <div className="login-container">
        {/* Left side with image */}
        <div className="login-left">
          <img src="/images/job1.jpg" alt="Job Portal" />
        </div>

        {/* Right side with form */}
        <div className="login-right">
          <div className="login-box">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Login</button>
            </form>

            {message && (
              <p style={{ marginTop: "10px", color: "red", textAlign: "center" }}>
                {message}
              </p>
            )}

            <div className="switch-text">
              Don’t have an account? <span>Register</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
