const express = require("express");

const {
  applyForJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const uploadResume = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get(
  "/my",
  protect,
  authorizeRoles("candidate"),
  getMyApplications
);

router.get(
  "/job/:jobId",
  protect,
  authorizeRoles("admin"),
  getApplicantsForJob
);

router.post(
  "/:jobId",
  protect,
  authorizeRoles("candidate"),
  uploadResume.single("resume"),
  applyForJob
);

router.put(
  "/:applicationId/status",
  protect,
  authorizeRoles("admin"),
  updateApplicationStatus
);

module.exports = router;