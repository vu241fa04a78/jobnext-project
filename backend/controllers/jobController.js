
const Job = require("../models/Job");

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new job
exports.createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description
    });

    res.status(201).json({
      message: "Job created successfully",
      job
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Job deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// Add multiple jobs
exports.createMultipleJobs = async (req, res) => {
  try {
    const jobs = await Job.insertMany(req.body);

    res.status(201).json({
      message: "Multiple jobs added successfully",
      count: jobs.length,
      jobs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};