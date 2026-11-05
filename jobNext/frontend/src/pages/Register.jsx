
import "./Auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BriefcaseBusiness, User, Mail, Lock } from "lucide-react";
import API_BASE_URL from "../api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Link to="/" className="brand">
          <BriefcaseBusiness size={28} />
          <span>JobNest</span>
        </Link>

        <div className="auth-content">
          <h1>Create your account</h1>
          <p>Join JobNest and take the next step in your career.</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <div className="input-box">
              <User size={19} />
              <input
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <label>Email Address</label>
            <div className="input-box">
              <Mail size={19} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Password</label>
            <div className="input-box">
              <Lock size={19} />
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <label>I want to join as</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>

            <button type="submit" className="auth-button">
              Create Account
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="auth-right">
        <div className="hero-circle"></div>
        <div className="hero-text">
          <span>YOUR CAREER STARTS HERE</span>
          <h2>Find opportunities.<br />Build your future.</h2>
          <p>Discover exciting opportunities and connect with companies that value your talent.</p>
        </div>
        <div className="hero-card">
          <BriefcaseBusiness size={25} />
          <div>
            <strong>Your next opportunity awaits!</strong>
            <p>Make your career move today.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;