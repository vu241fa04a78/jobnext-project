
import { useState } from "react";
import "./Admin.css";

function Admin() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job added successfully!");
        setForm({
          title: "",
          company: "",
          location: "",
          salary: "",
          description: ""
        });
      } else {
        alert(data.message || "Failed to add job");
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Add new job opportunities to JobNest</p>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <input
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default Admin;
