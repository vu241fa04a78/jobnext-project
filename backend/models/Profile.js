
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },

    skills: {
      type: String,
      default: ""
    },

    education: {
      type: String,
      default: ""
    },

    resumeLink: {
      type: String,
      default: ""
    },

    about: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
