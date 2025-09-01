import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });

      if (response && response.token) {
        // Save user and token
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("token", response.token);

        // Determine type based on backend response
        if (response.employerId) {
          // It's an Employer
          localStorage.setItem("employerId", response.employerId);
          navigate("/employer/dashboard");
        } else {
          // It's a Jobseeker
          navigate("/jobseeker/dashboard");
        }
      } else {
        setMessage("Invalid login response");
      }
    } catch (error) {
      setMessage(error.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="header">CareerCrafter</div>

      <div className="login-container">
        <div className="login-left">
          <img src="/images/job1.jpg" alt="Job Portal" />
        </div>

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

              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

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
            <div className="switch-text">
              Forgot your password? <a href="/forgot-password">Click here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
