const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required."],
      trim: true,
      unique: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    logo: {
      type: String,
      trim: true,
      default: "",
    },

    industry: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);