// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EmployerDashboard from "./pages/EmployerDashboard";
import ManageJobs from "./pages/ManageJobs";
import PostJob from "./pages/PostJob";
import Applications from "./pages/Applications"; 
import Company from "./pages/Company";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import JobseekerDashboard from "./pages/JobseekerDashboard";
import MyProfile from "./pages/MyProfile";
import ApplyJobs from "./pages/Applyjob";
import Jobdetail from "./pages/Jobdetail";

import Navbar from "./components/Navbar";
import EmployerSettings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages without Navbar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Employer Dashboard (after login) */}
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/manage-jobs" element={<ManageJobs />} />
        <Route path="/employer/post-job" element={<PostJob />} />
        <Route path="/employer/applications" element={<Applications />} />
        <Route path="/employer/settings" element={<EmployerSettings />} />

        {/* Jobseeker */}
        <Route path="/jobseeker/dashboard" element={<JobseekerDashboard />} />
        <Route path="/jobseeker/profile" element={<MyProfile />} />
        <Route path="/jobseeker/applyjobs" element={<ApplyJobs />} />
        {/* 👇 Correct route */}
        <Route path="/jobseeker/jobdetail/:jobId" element={<Jobdetail />} />

        {/* Company page */}
        <Route path="/employer/company" element={<Company />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Home page (with Navbar) */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
