
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        JobNest
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/jobs">Find Jobs</Link>

        <Link to="/companies">Companies</Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile">My Profile</Link>

            <button
              type="button"
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
