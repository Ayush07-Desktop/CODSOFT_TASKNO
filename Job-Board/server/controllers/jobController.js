const mongoose = require("mongoose");

const Job = require("../models/Job");
const Company = require("../models/Company");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

const companyPopulateFields =
  "name logo website industry location description";

const postedByPopulateFields = "name email role";

/**
 * Create a new job
 * POST /api/jobs
 * Admin only
 */
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      jobType,
      description,
      requirements,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      salary === undefined ||
      !jobType ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, company, location, salary, job type and description are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(company)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID.",
      });
    }

    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    if (
      existingCompany.createdBy &&
      existingCompany.createdBy.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not authorized to create a job for this company.",
      });
    }

    let requirementsArray = [];

    if (Array.isArray(requirements)) {
      requirementsArray = requirements
        .map((item) => String(item).trim())
        .filter(Boolean);
    } else if (
      typeof requirements === "string" &&
      requirements.trim()
    ) {
      requirementsArray = requirements
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    const job = await Job.create({
      title: title.trim(),
      company,
      location: location.trim(),
      salary: Number(salary),
      jobType,
      description: description.trim(),
      requirements: requirementsArray,
      postedBy: req.user._id,
    });

    await job.populate([
      {
        path: "company",
        select: companyPopulateFields,
      },
      {
        path: "postedBy",
        select: postedByPopulateFields,
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (item) => item.message
      );

      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while creating job.",
    });
  }
};

/**
 * Get all jobs
 * GET /api/jobs
 * Public
 */
const getAllJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      company,
      minSalary,
      maxSalary,
      sort = "newest",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
        { requirements: searchRegex },
      ];
    }

    if (location && location.trim()) {
      query.location = {
        $regex: location.trim(),
        $options: "i",
      };
    }

    if (jobType && jobType !== "All") {
      query.jobType = jobType;
    }

    if (company) {
      if (!mongoose.Types.ObjectId.isValid(company)) {
        return res.status(400).json({
          success: false,
          message: "Invalid company ID.",
        });
      }

      query.company = company;
    }

    if (minSalary || maxSalary) {
      query.salary = {};

      if (minSalary) {
        const parsedMinSalary = Number(minSalary);

        if (Number.isNaN(parsedMinSalary)) {
          return res.status(400).json({
            success: false,
            message: "Minimum salary must be a valid number.",
          });
        }

        query.salary.$gte = parsedMinSalary;
      }

      if (maxSalary) {
        const parsedMaxSalary = Number(maxSalary);

        if (Number.isNaN(parsedMaxSalary)) {
          return res.status(400).json({
            success: false,
            message: "Maximum salary must be a valid number.",
          });
        }

        query.salary.$lte = parsedMaxSalary;
      }
    }

    const pageNumber = Math.max(
      Number.parseInt(page, 10) || 1,
      1
    );

    const limitNumber = Math.min(
      Math.max(Number.parseInt(limit, 10) || 10, 1),
      100
    );

    const skip = (pageNumber - 1) * limitNumber;

    let sortOption = { createdAt: -1 };

    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "salary-high":
        sortOption = { salary: -1 };
        break;

      case "salary-low":
        sortOption = { salary: 1 };
        break;

      case "title-asc":
        sortOption = { title: 1 };
        break;

      case "title-desc":
        sortOption = { title: -1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate({
        path: "company",
        select: companyPopulateFields,
      })
      .populate({
        path: "postedBy",
        select: postedByPopulateFields,
      })
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    const totalPages =
      totalJobs === 0
        ? 0
        : Math.ceil(totalJobs / limitNumber);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      totalJobs,
      currentPage: pageNumber,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
      jobs,
    });
  } catch (error) {
    console.error("Get all jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching jobs.",
    });
  }
};

/**
 * Get one job
 * GET /api/jobs/:jobId
 * Public
 */
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const job = await Job.findById(jobId)
      .populate({
        path: "company",
        select: companyPopulateFields,
      })
      .populate({
        path: "postedBy",
        select: postedByPopulateFields,
      });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get job by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching the job.",
    });
  }
};

/**
 * Update a job
 * PUT /api/jobs/:jobId
 * Admin only
 */
const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    if (
      job.postedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job.",
      });
    }

    if (req.body.company !== undefined) {
      if (
        !mongoose.Types.ObjectId.isValid(req.body.company)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid company ID.",
        });
      }

      const existingCompany = await Company.findById(
        req.body.company
      );

      if (!existingCompany) {
        return res.status(404).json({
          success: false,
          message: "Company not found.",
        });
      }

      if (
        existingCompany.createdBy &&
        existingCompany.createdBy.toString() !==
          req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not authorized to assign this company.",
        });
      }

      job.company = req.body.company;
    }

    if (req.body.title !== undefined) {
      job.title = req.body.title.trim();
    }

    if (req.body.location !== undefined) {
      job.location = req.body.location.trim();
    }

    if (req.body.salary !== undefined) {
      job.salary = Number(req.body.salary);
    }

    if (req.body.jobType !== undefined) {
      job.jobType = req.body.jobType;
    }

    if (req.body.description !== undefined) {
      job.description = req.body.description.trim();
    }

    if (req.body.requirements !== undefined) {
      if (Array.isArray(req.body.requirements)) {
        job.requirements = req.body.requirements
          .map((item) => String(item).trim())
          .filter(Boolean);
      } else if (
        typeof req.body.requirements === "string"
      ) {
        job.requirements = req.body.requirements
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Requirements must be an array or comma-separated string.",
        });
      }
    }

    await job.save();

    await job.populate([
      {
        path: "company",
        select: companyPopulateFields,
      },
      {
        path: "postedBy",
        select: postedByPopulateFields,
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Update job error:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (item) => item.message
      );

      return res.status(400).json({
        success: false,
        message: errors.join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while updating job.",
    });
  }
};

/**
 * Delete a job
 * DELETE /api/jobs/:jobId
 * Admin only
 */
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    if (
      job.postedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job.",
      });
    }

    await Promise.all([
      Application.deleteMany({ job: jobId }),
      SavedJob.deleteMany({ job: jobId }),
    ]);

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Job and its related applications and saved records were deleted successfully.",
    });
  } catch (error) {
    console.error("Delete job error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting job.",
    });
  }
};

/**
 * Get jobs posted by logged-in admin
 * GET /api/jobs/my-jobs
 * Admin only
 */
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user._id,
    })
      .populate({
        path: "company",
        select: companyPopulateFields,
      })
      .populate({
        path: "postedBy",
        select: postedByPopulateFields,
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get my jobs error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching your jobs.",
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
};