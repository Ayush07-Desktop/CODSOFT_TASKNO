const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router.get("/", getAllJobs);
router.get("/:id", getJobById);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createJob
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateJob
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteJob
);

module.exports = router;