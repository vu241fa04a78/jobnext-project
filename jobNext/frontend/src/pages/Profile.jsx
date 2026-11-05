
import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import API_BASE_URL from "../api";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    resumeLink: "",
    about: ""
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_BASE_URL}/api/profile`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Complete your profile to improve your job opportunities.</p>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>

          {["name", "email", "phone", "skills", "education", "resumeLink"].map((field) => (
            <div key={field}>
              <label>{field === "resumeLink" ? "Resume Link" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={profile[field]}
                onChange={handleChange}
                required={["name", "email"].includes(field)}
              />
            </div>
          ))}

          <div>
            <label>About Me</label>
            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="profile-btn">
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
}

export default Profile;
