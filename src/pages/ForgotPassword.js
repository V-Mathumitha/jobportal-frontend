import React, { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5270/api/User/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // ✅ only email for forgot
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password reset link sent (simulation)");

        // ✅ Redirect to reset password page after 2 sec
        setTimeout(() => {
          window.location.href = "/reset-password";
        }, 2000);

        setEmail("");
      } else {
        setMessage(data.message || "Error processing request");
      }
    } catch (error) {
      setMessage("Server not reachable");
    }
  };

  return (
    <div className="forgot-page">
      <div className="header">CareerCrafter</div>

      <div className="forgot-container">
        <div className="forgot-box">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter existing email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Reset Password</button>
          </form>

          {message && (
            <p
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: message.toLowerCase().includes("sent") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}

          <div className="switch-text">
            Back to <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
