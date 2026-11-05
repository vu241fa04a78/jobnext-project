
const Application = require("../models/Application");
const Job = require("../models/Job");

exports.createApplication = async (req, res) => {
  try {
    const {
      jobId,
      applicantName,
      email,
      phone,
      resumeLink,
      coverLetter
    } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    const application = await Application.create({
      jobId,
      applicantName,
      email,
      phone,
      resumeLink,
      coverLetter
    });

    res.status(201).json({
      message: "Application submitted successfully!",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
