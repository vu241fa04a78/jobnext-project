
import { Link } from "react-router-dom";
import "./Home.css";
import {
  BriefcaseBusiness,
  Code,
  Database,
  Palette,
  Megaphone,
  Building2,
  Wallet,
  ArrowRight,
  Search,
  Users,
  TrendingUp,
  CheckCircle
} from "lucide-react";

function Home() {
  const categories = [
    { icon: Code, name: "Technology", jobs: "120+ Jobs" },
    { icon: Database, name: "Data Science", jobs: "85+ Jobs" },
    { icon: Palette, name: "Design", jobs: "60+ Jobs" },
    { icon: Megaphone, name: "Marketing", jobs: "90+ Jobs" },
    { icon: Building2, name: "Business", jobs: "75+ Jobs" },
    { icon: Wallet, name: "Finance", jobs: "50+ Jobs" }
  ];

  const companies = [
    { name: "Google", letter: "G" },
    { name: "Microsoft", letter: "M" },
    { name: "Amazon", letter: "A" },
    { name: "Infosys", letter: "I" }
  ];

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">

          <span className="hero-tag">
            <TrendingUp size={16} />
            YOUR CAREER STARTS HERE
          </span>

          <h1>
            Discover Your
            <span> Dream Career.</span>
            <br />
            Start Something Great.
          </h1>

          <p className="hero-description">
            Find exciting job opportunities, connect with leading
            companies and turn your career ambitions into reality.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs" className="primary-btn">
              Explore Jobs <ArrowRight size={19} />
            </Link>

            <Link to="/register" className="secondary-btn">
              Create Account
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h2>500+</h2>
              <p>Job Opportunities</p>
            </div>

            <div>
              <h2>100+</h2>
              <p>Companies</p>
            </div>

            <div>
              <h2>1K+</h2>
              <p>Job Seekers</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-decoration"></div>

          <div className="main-visual-card">
            <div className="visual-top">
              <div className="visual-icon">
                <BriefcaseBusiness size={32} />
              </div>
              <span>Career Opportunities</span>
            </div>

            <h2>Your future starts with the right opportunity.</h2>

            <div className="visual-job">
              <div className="job-symbol">JD</div>
              <div>
                <strong>Find Your Dream Role</strong>
                <p>Explore opportunities</p>
              </div>
              <CheckCircle color="#7040d9" size={21} />
            </div>

            <div className="visual-job">
              <div className="job-symbol second">JP</div>
              <div>
                <strong>Connect With Companies</strong>
                <p>Build your career</p>
              </div>
              <CheckCircle color="#7040d9" size={21} />
            </div>

            <Link to="/jobs" className="visual-link">
              Explore opportunities <ArrowRight size={17} />
            </Link>
          </div>

          <div className="floating-card">
            <TrendingUp size={22} />
            <div>
              <strong>Grow Your Career</strong>
              <p>One opportunity at a time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="section-heading">
          <span>EXPLORE OPPORTUNITIES</span>
          <h2>Popular Job Categories</h2>
          <p>Find the perfect role that matches your skills and interests.</p>
        </div>

        <div className="category-grid">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                to="/jobs"
                className="category-card"
                key={item.name}
              >
                <div className="category-icon">
                  <Icon size={27} />
                </div>

                <h3>{item.name}</h3>
                <p>{item.jobs}</p>

                <span>
                  Explore <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* COMPANIES */}
      <section className="companies-section">
        <div className="section-heading">
          <span>TOP EMPLOYERS</span>
          <h2>Companies Hiring Now</h2>
          <p>Discover career opportunities from leading companies.</p>
        </div>

        <div className="company-grid">
          {companies.map((company) => (
            <div className="company-card" key={company.name}>
              <div className="company-logo">
                {company.letter}
              </div>

              <h3>{company.name}</h3>
              <p>Explore career opportunities</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY JOBNEST */}
      <section className="why-section">
        <div className="section-heading">
          <span>WHY JOBNEST</span>
          <h2>Your Career Journey, Simplified</h2>
          <p>Everything you need to take your next career step.</p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">
              <Search size={28} />
            </div>
            <h3>Find Opportunities</h3>
            <p>Explore job opportunities that match your interests and skills.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <Users size={28} />
            </div>
            <h3>Connect With Employers</h3>
            <p>Discover companies and connect with potential employers.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">
              <TrendingUp size={28} />
            </div>
            <h3>Grow Your Career</h3>
            <p>Take the next step towards achieving your professional goals.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta-section">
        <span>YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>Ready to Find Your Dream Job?</h2>
        <p>Create your free account and discover new career opportunities.</p>

        <Link to="/register">
          Get Started <ArrowRight size={19} />
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-content">
          <div>
            <h2><BriefcaseBusiness size={25} /> JobNest</h2>
            <p>Connecting talent with opportunities.</p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 JobNest. All rights reserved.
        </div>
      </footer>

    </div>
  );
}

export default Home;
