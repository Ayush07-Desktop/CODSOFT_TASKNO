import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./JobDetails.css";
import ApplyModal from "../components/ApplyModal";

function JobDetails({ jobs }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const job = jobs.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <div className="job-details">
        <h2>Job Not Found</h2>
        <button className="back-btn" onClick={() => navigate("/jobs")}>
          ← Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="job-details">

      <button
        className="back-btn"
        onClick={() => navigate("/jobs")}
      >
        ← Back to Jobs
      </button>

      <div className="job-header">
        <img
          src={job.logo}
          alt={job.company}
          className="company-logo-large"
        />

        <h1>{job.title}</h1>

        <h2 className="company-name">{job.company}</h2>
      </div>

      <div className="job-info">

        <div className="info-card">
          <strong>📍 Location</strong>
          <p>{job.location}</p>
        </div>

        <div className="info-card">
          <strong>💰 Salary</strong>
          <p>{job.salary}</p>
        </div>

        <div className="info-card">
          <strong>💼 Job Type</strong>
          <p>{job.type}</p>
        </div>

        <div className="info-card">
          <strong>🏷 Category</strong>
          <p>{job.category}</p>
        </div>

      </div>

      <div className="description">
        <h2>Job Description</h2>

        <p>{job.description}</p>
      </div>

      <button
        className="apply-btn"
        onClick={() => setShowModal(true)}
      >
        Apply Now
      </button>

      {showModal && (
        <ApplyModal onClose={() => setShowModal(false)} />
      )}

    </div>
  );
}

export default JobDetails;