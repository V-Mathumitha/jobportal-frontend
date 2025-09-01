import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ResetPassword.css";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // If email passed from previous page, use it. Otherwise user can type it.
  const [email, setEmail] = useState(location.state?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const rules = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[A-Z]/, label: "At least one uppercase letter" },
    { regex: /[a-z]/, label: "At least one lowercase letter" },
    { regex: /\d/, label: "At least one number" },
    { regex: /[@$!%*?&]/, label: "At least one special character (@$!%*?&)" },
  ];

  const checkRule = (rule) => rule.regex.test(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("⚠️ Please enter your email.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    const allValid = rules.every((rule) => checkRule(rule));
    if (!allValid) {
      setMessage("❌ Password does not meet all rules");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5270/api/User/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email, // always send this
            newPassword: newPassword,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "❌ Error resetting password");
      }
    } catch (error) {
      setMessage("⚠️ Server not reachable");
    }
  };

  return (
    <div className="reset-page">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="password-input">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        {/* New Password */}
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Password Rules */}
        <div className="rules">
          {rules.map((rule, idx) => (
            <p key={idx} className={checkRule(rule) ? "valid" : "invalid"}>
              {rule.label}
            </p>
          ))}
        </div>

        {/* Confirm Password */}
        <div className="password-input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="toggle-eye"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit">Reset</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
