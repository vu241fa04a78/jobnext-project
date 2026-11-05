
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Apply.css";

function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    phone: "",
    resumeLink: "",
    coverLetter: ""
  });

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

    try {
      const response = await axios.post(
        "http://localhost:5000/api/applications",
        {
          ...formData,
          jobId
        }
      );

      alert(response.data.message || "Application submitted successfully!");
      navigate("/jobs");

    } catch (error) {
      alert(
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
        <p>Complete your details to submit your application.</p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="applicantName"
            placeholder="Enter your full name"
            value={formData.applicantName}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Resume Link</label>
          <input
            type="url"
            name="resumeLink"
            placeholder="Paste your resume link"
            value={formData.resumeLink}
            onChange={handleChange}
            required
          />

          <label>Cover Letter</label>
          <textarea
            name="coverLetter"
            placeholder="Why are you suitable for this job?"
            value={formData.coverLetter}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Apply;
