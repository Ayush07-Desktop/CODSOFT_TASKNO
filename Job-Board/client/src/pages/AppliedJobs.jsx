import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./AppliedJobs.css";

function AppliedJobs() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setApplications(savedApplications);
  }, []);

  const deleteApplication = (index) => {
    const updatedApplications = [...applications];
    updatedApplications.splice(index, 1);

    setApplications(updatedApplications);

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    toast.success("Application deleted successfully!");
  };

  return (
    <div className="applied-container">
      <h1>Applied Jobs</h1>

      {applications.length === 0 ? (
        <div className="empty-state">

          <div className="empty-state">

            <div className="empty-icon">
              📄
            </div>

            <h2>No Applications Yet</h2>

            <p>
              You haven't applied for any jobs yet.
            </p>

            <Link to="/jobs">
              <button className="empty-action-btn">
                Explore Jobs
              </button>
            </Link>

          </div>

          <p>Apply for a job to see your applications here.</p>
        </div>
      ) : (
        <div className="applications-grid">
          {applications.map((application, index) => (
            <div
              className="application-card"
              key={index}
            >
              <div className="job-header">

                <img
                  src={application.logo}
                  alt={application.company}
                  className="company-logo"
                />

                <div>
                  <h2>{application.jobTitle}</h2>

                  <h3>{application.company}</h3>

                  <p>📍 {application.location}</p>
                </div>

              </div>

              <hr />

              <h4>Applicant Details</h4>

              <p>
                <strong>Name:</strong> {application.name}
              </p>

              <p>
                <strong>Email:</strong> {application.email}
              </p>

              <p>
                <strong>Phone:</strong> {application.phone}
              </p>

              <p>
                <strong>Resume:</strong> {application.resume}
              </p>

              <p>
                <strong>Cover Letter:</strong>
              </p>

              <p>{application.coverLetter}</p>

              <p>
                <strong>Applied On:</strong>{" "}
                {application.appliedDate}
              </p>

              <button
                className="delete-btn"
                onClick={() => deleteApplication(index)}
              >
                Delete Application
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppliedJobs;