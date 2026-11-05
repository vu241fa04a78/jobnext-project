
const express = require("express");
const router = express.Router();

const { updateProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

// Update profile
router.put("/", authMiddleware, updateProfile);

module.exports = router;
