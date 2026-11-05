
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ApplyJob.css";
import API_BASE_URL from "../api";

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: ""
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
        `${API_BASE_URL}/api/applications`,
        {
          ...formData,
          jobId
        }
      );

      setMessage("Application submitted successfully!");

      setTimeout(() => navigate("/jobs"), 1500);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-page">
      <div className="apply-container">

        <h1>Apply for Job</h1>
        <p>Submit your details to apply through JobNest.</p>

        {message && <div className="apply-message">{message}</div>}

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <label>Resume Link</label>
          <input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder="Paste your Google Drive resume link"
            required
          />

          <label>Cover Letter</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Tell us why you are suitable for this job"
            rows="5"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ApplyJob;
