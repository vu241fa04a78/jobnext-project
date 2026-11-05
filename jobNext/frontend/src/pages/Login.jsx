
import "./Auth.css";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BriefcaseBusiness } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // LOGIN FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        }
      );

      const { token, user } = response.data;

      if (!token || !user || !user.role) {
        setError("Login response is missing token or user role.");
        return;
      }

      // Save login information
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role.trim().toLowerCase();

      console.log("Logged in user:", user);
      console.log("User role:", role);

      alert("Login successful!");

      // Redirect according to role
      if (role === "employer") {
        navigate("/recruiter-dashboard", {
          replace: true
        });
      } 
      else if (role === "jobseeker") {
        const previousPage = location.state?.from;

        navigate(previousPage || "/jobs", {
          replace: true
        });
      } 
      else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setError("Invalid user role. Please contact support.");
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to login. Please check your backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-logo">
          <BriefcaseBusiness size={35} />
          <h2>JobNest</h2>
        </div>

        <h1>Welcome Back!</h1>

        <p>Login to continue your career journey.</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
