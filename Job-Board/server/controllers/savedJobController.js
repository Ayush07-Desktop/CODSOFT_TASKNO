const SavedJob = require("../models/SavedJob");
const Job = require("../models/Job");

// Save a job
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const alreadySaved = await SavedJob.findOne({
      candidate: req.user._id,
      job: jobId,
    });

    if (alreadySaved) {
      return res.status(409).json({
        success: false,
        message: "Job already saved.",
      });
    }

    const savedJob = await SavedJob.create({
      candidate: req.user._id,
      job: jobId,
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully.",
      savedJob,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error while saving job.",
    });
  }
};

// Get saved jobs
const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      candidate: req.user._id,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: savedJobs.length,
      savedJobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching saved jobs.",
    });
  }
};

// Remove saved job
const removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const savedJob = await SavedJob.findOne({
      candidate: req.user._id,
      job: jobId,
    });

    if (!savedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found.",
      });
    }

    await savedJob.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Saved job removed successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error while removing saved job.",
    });
  }
};

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};