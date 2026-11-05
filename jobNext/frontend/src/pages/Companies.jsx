
import "./Companies.css";
import { Link } from "react-router-dom";

function Companies() {
  const companies = [
    { name: "Google", location: "Hyderabad", jobs: 12, logo: "G" },
    { name: "Microsoft", location: "Bangalore", jobs: 8, logo: "M" },
    { name: "Amazon", location: "Hyderabad", jobs: 15, logo: "A" },
    { name: "Infosys", location: "Pune", jobs: 10, logo: "I" },
    { name: "TCS", location: "Chennai", jobs: 20, logo: "T" },
    { name: "Accenture", location: "Mumbai", jobs: 9, logo: "A" },
    { name: "Wipro", location: "Bangalore", jobs: 7, logo: "W" },
    { name: "Deloitte", location: "Hyderabad", jobs: 11, logo: "D" }
  ];

  return (
    <div className="companies-page">

      <section className="companies-hero">
        <h1>Explore Top Companies</h1>
        <p>Discover great companies and find your next opportunity.</p>
      </section>

      <div className="companies-grid">
        {companies.map((company, index) => (
          <div className="company-card" key={index}>

            <div className="company-logo">
              {company.logo}
            </div>

            <h2>{company.name}</h2>

            <p>📍 {company.location}</p>

            <p>💼 {company.jobs} Open Positions</p>

            <Link
              to={`/jobs?company=${encodeURIComponent(company.name)}`}
              className="view-jobs-btn"
            >
              View Jobs →
            </Link>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Companies;
