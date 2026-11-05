
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Jobs.css";
import API_BASE_URL from "../api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCompany = searchParams.get("company") || "";

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/jobs`
        );

        setJobs(response.data);
      } catch (err) {
        setError("Unable to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Search and filter jobs
  const filteredJobs = jobs.filter((job) => {
    const title = (job.title || "").toLowerCase();
    const company = (job.company || "").toLowerCase();
    const jobLocation = (job.location || "").toLowerCase();

    const searchText = search.toLowerCase();
    const locationText = location.toLowerCase();

    const matchSearch =
      title.includes(searchText) ||
      company.includes(searchText);

    const matchLocation =
      jobLocation.includes(locationText);

    const matchCompany = selectedCompany
      ? company === selectedCompany.toLowerCase()
      : true;

    return matchSearch && matchLocation && matchCompany;
  });

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setSearchParams({});
  };

  // Apply only after login
  const handleApply = (jobId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login or create an account before applying!");

      navigate("/login", {
        state: { from: `/apply/${jobId}` }
      });

      return;
    }

    navigate(`/apply/${jobId}`);
  };

  return (
    <div className="jobs-page">

      {/* Hero Section */}
      <section className="jobs-hero">
        <h1>Find Your Dream Job</h1>

        <p>
          Explore opportunities and build your career with JobNest.
        </p>

        <div className="jobs-search">
          <input
            type="text"
            placeholder="Job title or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </section>

      {/* Jobs Section */}
      <section className="jobs-content">

        <h2>
          {selectedCompany
            ? `${selectedCompany} Jobs`
            : "Latest Job Opportunities"}
        </h2>

        {selectedCompany && (
          <button
            className="clear-filter"
            onClick={clearFilters}
          >
            Show All Companies
          </button>
        )}

        {loading && <p>Loading jobs...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <>
            <p>{filteredJobs.length} jobs found</p>

            <div className="jobs-list">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div className="job-card" key={job._id}>

                    <h3>{job.title}</h3>

                    <p>
                      <strong>Company:</strong> {job.company}
                    </p>

                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>

                    <p>
                      <strong>Salary:</strong>{" "}
                      {job.salary || "Not specified"}
                    </p>

                    <p>{job.description}</p>

                    <button
                      type="button"
                      onClick={() => handleApply(job._id)}
                    >
                      Apply Now
                    </button>

                  </div>
                ))
              ) : (
                <p>No jobs found. Try changing your search.</p>
              )}
            </div>
          </>
        )}

      </section>
    </div>
  );
}

export default Jobs;
