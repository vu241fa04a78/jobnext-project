
const Profile = require("../models/Profile");

exports.updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      skills,
      education,
      resumeLink,
      about
    } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        name,
        email,
        phone,
        skills,
        education,
        resumeLink,
        about
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      profile
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
