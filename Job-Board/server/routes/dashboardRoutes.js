const express = require("express");

const {
  getRecruiterDashboard,
  getCandidateDashboard,
} = require("../controllers/dashboardController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/recruiter",
  protect,
  authorizeRoles("admin"),
  getRecruiterDashboard
);

router.get(
  "/candidate",
  protect,
  authorizeRoles("candidate"),
  getCandidateDashboard
);

module.exports = router;