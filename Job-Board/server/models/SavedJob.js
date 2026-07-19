const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate saves
savedJobSchema.index(
  { candidate: 1, job: 1 },
  { unique: true }
);

module.exports = mongoose.model("SavedJob", savedJobSchema);