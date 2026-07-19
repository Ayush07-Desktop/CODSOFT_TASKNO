const Company = require("../models/Company");
const Job = require("../models/Job");

// Create company
const createCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      website,
      logo,
      industry,
      location,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    const existingCompany = await Company.findOne({
      name: name.trim(),
    });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company already exists.",
      });
    }

    const company = await Company.create({
      name: name.trim(),
      description: description || "",
      website: website || "",
      logo: logo || "",
      industry: industry || "",
      location: location || "",
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      company,
    });
  } catch (error) {
    console.error("Create company error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Company already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while creating company.",
    });
  }
};

// Get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.error("Get companies error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while loading companies.",
    });
  }
};

// Get one company
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId)
      .populate("createdBy", "name email");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const jobs = await Job.find({
      company: company._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      company,
      jobs,
    });
  } catch (error) {
    console.error("Get company error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while loading company.",
    });
  }
};

// Update company
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    if (company.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot update this company.",
      });
    }

    const allowedFields = [
      "name",
      "description",
      "website",
      "logo",
      "industry",
      "location",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        company[field] = req.body[field];
      }
    });

    await company.save();

    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      company,
    });
  } catch (error) {
    console.error("Update company error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A company with this name already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while updating company.",
    });
  }
};

// Delete company
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    if (company.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot delete this company.",
      });
    }

    const companyJobs = await Job.countDocuments({
      company: company._id,
    });

    if (companyJobs > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Delete all jobs belonging to this company before deleting the company.",
      });
    }

    await company.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error("Delete company error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting company.",
    });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};