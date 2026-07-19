const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coverLetter: {
      type: String,
      trim: true,
      maxlength: 3000,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    resumePublicId: {
      type: String,
      required: true,
    },

    resumeOriginalName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Reviewed",
        "Interview",
        "Rejected",
        "Accepted",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index(
  {
    job: 1,
    applicant: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);