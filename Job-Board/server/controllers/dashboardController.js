const Job = require("../models/Job");
const Application = require("../models/Application");

// Recruiter dashboard
const getRecruiterDashboard = async (req, res) => {
  try {
    const recruiterId = req.user._id;

    const recruiterJobs = await Job.find({
      postedBy: recruiterId,
    }).select("_id");

    const jobIds = recruiterJobs.map((job) => job._id);

    const [
      totalJobs,
      totalApplications,
      pending,
      reviewed,
      interview,
      accepted,
      rejected,
    ] = await Promise.all([
      Job.countDocuments({
        postedBy: recruiterId,
      }),

      Application.countDocuments({
        job: { $in: jobIds },
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "Pending",
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "Reviewed",
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "Interview",
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "Accepted",
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "Rejected",
      }),
    ]);

    const recentApplications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("applicant", "name email")
      .populate("job", "title company")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      dashboard: {
        totalJobs,
        totalApplications,
        pending,
        reviewed,
        interview,
        accepted,
        rejected,
        recentApplications,
      },
    });
  } catch (error) {
    console.error("Recruiter dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while loading recruiter dashboard.",
    });
  }
};

// Candidate dashboard
const getCandidateDashboard = async (req, res) => {
  try {
    const candidateId = req.user._id;

    const [
      totalApplications,
      pending,
      reviewed,
      interview,
      accepted,
      rejected,
      recentApplications,
    ] = await Promise.all([
      Application.countDocuments({
        applicant: candidateId,
      }),

      Application.countDocuments({
        applicant: candidateId,
        status: "Pending",
      }),

      Application.countDocuments({
        applicant: candidateId,
        status: "Reviewed",
      }),

      Application.countDocuments({
        applicant: candidateId,
        status: "Interview",
      }),

      Application.countDocuments({
        applicant: candidateId,
        status: "Accepted",
      }),

      Application.countDocuments({
        applicant: candidateId,
        status: "Rejected",
      }),

      Application.find({
        applicant: candidateId,
      })
        .populate(
          "job",
          "title company location salary jobType"
        )
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return res.status(200).json({
      success: true,
      dashboard: {
        profile: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },

        stats: {
          totalApplications,
          pending,
          reviewed,
          interview,
          accepted,
          rejected,
        },

        recentApplications,
      },
    });
  } catch (error) {
    console.error("Candidate dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while loading candidate dashboard.",
    });
  }
};

module.exports = {
  getRecruiterDashboard,
  getCandidateDashboard,
};