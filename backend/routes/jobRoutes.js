const express = require("express");
const router = express.Router();

const {
  getJobs,
  createJob,
  deleteJob,
  createMultipleJobs
} = require("../controllers/jobController");

router.get("/", getJobs);
router.post("/", createJob);
router.post("/bulk", createMultipleJobs);
router.delete("/:id", deleteJob);

module.exports = router;