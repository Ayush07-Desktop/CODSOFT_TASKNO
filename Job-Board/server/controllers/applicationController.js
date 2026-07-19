const Application = require("../models/Application");
const Job = require("../models/Job");
const {
    uploadBufferToCloudinary,
} = require("../utils/cloudinaryUpload");


const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { coverLetter } = req.body || {};

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found.",
            });
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: req.user._id,
        });

        if (existingApplication) {
            return res.status(409).json({
                success: false,
                message: "You have already applied for this job.",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload your resume.",
            });
        }

        const uploadedResume = await uploadBufferToCloudinary(
            req.file.buffer,
            req.file.originalname
        );

        const application = await Application.create({
            job: jobId,
            applicant: req.user._id,
            coverLetter: coverLetter || "",
            resumeUrl: uploadedResume.secure_url,
            resumePublicId: uploadedResume.public_id,
            resumeOriginalName: req.file.originalname,
        });

        const populatedApplication = await Application.findById(
            application._id
        )
            .populate("job", "title company location jobType")
            .populate("applicant", "name email");

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully.",
            application: populatedApplication,
        });
    } catch (error) {
        console.error("Apply for job error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "You have already applied for this job.",
            });
        }

        if (error.message?.includes("File size too large")) {
            return res.status(400).json({
                success: false,
                message: "Resume size must not exceed 5 MB.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error while submitting application.",
            error: error.message,
        });
    }
};

// Get all applications of the logged-in candidate
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            applicant: req.user._id,
        })
            .populate({
                path: "job",
                select: "title company location salary jobType",
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });
    } catch (error) {
        console.error("Get my applications error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching applications.",
        });
    }
};

// Get all applicants for a specific job (Admin)
const getApplicantsForJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const applications = await Application.find({
            job: jobId,
        })
            .populate("applicant", "name email")
            .populate("job", "title company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });
    } catch (error) {
        console.error("Get applicants error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching applicants.",
        });
    }
};

// Update application status (Admin)
const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Reviewed",
            "Interview",
            "Rejected",
            "Accepted",
        ];

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required.",
            });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status.",
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found.",
            });
        }

        application.status = status;

        await application.save();

        const updatedApplication = await Application.findById(applicationId)
            .populate("applicant", "name email")
            .populate("job", "title company");

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully.",
            application: updatedApplication,
        });
    } catch (error) {
        console.error("Update application status error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while updating application status.",
        });
    }
};

module.exports = {
    applyForJob,
    getMyApplications,
    getApplicantsForJob,
    updateApplicationStatus,
};
