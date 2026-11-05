
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/jobs"
      );
      setJobs(response.data);
    } catch (error) {
      console.log("Error loading jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== id)
      );

      alert("Job deleted successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete job");
    }
  };

  return (
    <div className="recruiter-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Recruiter Dashboard</h1>
          <p>Manage your job postings with JobNest.</p>
        </div>

        <button
          className="post-job-btn"
          onClick={() => navigate("/post-job")}
        >
          + Post New Job
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>{jobs.length}</h2>
          <p>Total Jobs Posted</p>
        </div>
      </div>

      <h2>Manage Jobs</h2>

      <div className="dashboard-jobs">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="dashboard-job-card" key={job._id}>
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary || "Not specified"}</p>

              <button onClick={() => deleteJob(job._id)}>
                Delete Job
              </button>
            </div>
          ))
        ) : (
          <p>No jobs posted yet. Click Post New Job to get started.</p>
        )}
      </div>

    </div>
  );
}

export default RecruiterDashboard;
