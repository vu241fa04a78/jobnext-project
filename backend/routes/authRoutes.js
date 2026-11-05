
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMyProfile,
  updateMyProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected profile routes
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateMyProfile);

module.exports = router;
