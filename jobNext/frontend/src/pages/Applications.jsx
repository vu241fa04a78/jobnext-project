import { useEffect, useState } from "react";
import axios from "axios";
import "./Applications.css";
import API_BASE_URL from "../api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/applications`
        );
        setApplications(response.data);
      } catch (error) {
        console.log("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="applications-page">
      <h1>Job Applications</h1>
      <p>Manage applications submitted by candidates.</p>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div className="application-card" key={app._id}>
              <h2>{app.applicantName}</h2>
              <p><strong>Job:</strong> {app.jobId?.title || "Job unavailable"}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p>
                <strong>Resume:</strong>{" "}
                <a href={app.resumeLink} target="_blank" rel="noreferrer">
                  View Resume
                </a>
              </p>
              <p><strong>Cover Letter:</strong> {app.coverLetter || "Not provided"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;