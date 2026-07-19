const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    jobType: {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Internship",
        "Remote",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: [String],
      default: [],
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);