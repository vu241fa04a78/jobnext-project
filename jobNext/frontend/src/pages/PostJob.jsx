
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PostJob.css";
import API_BASE_URL from "../api";

function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        `${API_BASE_URL}/api/jobs`,
        formData
      );

      setMessage("Job posted successfully!");

      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
      });

      setTimeout(() => navigate("/jobs"), 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to post job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-page">

      <div className="post-job-container">

        <h1>Post a Job</h1>
        <p>Find the right talent for your company with JobNest.</p>

        {message && <div className="job-message">{message}</div>}

        <form onSubmit={handleSubmit}>

          <label>Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="Example: Frontend Developer"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Company Name</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Example: Hyderabad"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Salary</label>
          <input
            type="text"
            name="salary"
            placeholder="Example: 4-6 LPA"
            value={formData.salary}
            onChange={handleChange}
          />

          <label>Job Description</label>
          <textarea
            name="description"
            placeholder="Describe the job role and responsibilities..."
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </button>

        </form>
      </div>

    </div>
  );
}

export default PostJob;
