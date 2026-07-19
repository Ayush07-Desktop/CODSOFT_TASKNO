const express = require("express");

const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

const {
  protect,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllCompanies);

router.get("/:companyId", getCompanyById);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createCompany
);

router.put(
  "/:companyId",
  protect,
  authorizeRoles("admin"),
  updateCompany
);

router.delete(
  "/:companyId",
  protect,
  authorizeRoles("admin"),
  deleteCompany
);

module.exports = router;