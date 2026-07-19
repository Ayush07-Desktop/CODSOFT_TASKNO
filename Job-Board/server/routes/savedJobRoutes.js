const express = require("express");

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Candidate can view all saved jobs
router.get(
  "/",
  protect,
  authorizeRoles("candidate"),
  getSavedJobs
);

// Candidate can save a job
router.post(
  "/:jobId",
  protect,
  authorizeRoles("candidate"),
  saveJob
);

// Candidate can remove a saved job
router.delete(
  "/:jobId",
  protect,
  authorizeRoles("candidate"),
  removeSavedJob
);

module.exports = router;