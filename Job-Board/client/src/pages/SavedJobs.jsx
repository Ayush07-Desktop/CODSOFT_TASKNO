import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./SavedJobs.css";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  const removeJob = (id) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== id);

    setSavedJobs(updatedJobs);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    toast.success("Job removed from Saved Jobs!");
  };

  return (
    <div className="saved-container">
      <h1>❤️ Saved Jobs</h1>

      {savedJobs.length === 0 ? (

        <div className="empty-state">
          <div className="empty-icon">❤️</div>

          <h2>No Saved Jobs Yet</h2>

          <p>
            Save your favorite jobs and they will appear here.
          </p>

          <Link to="/jobs">
            <button className="empty-action-btn">
              Browse Jobs
            </button>
          </Link>
        </div>

      ) : (
        <div className="saved-grid">
          {savedJobs.map((job) => (
            <div className="saved-card" key={job.id}>
              <img
                src={job.logo}
                alt={job.company}
                className="saved-logo"
              />

              <h2>{job.title}</h2>

              <h3>{job.company}</h3>

              <p>📍 {job.location}</p>

              <p>💰 {job.salary}</p>

              <p>💼 {job.type}</p>

              <button
                className="remove-btn"
                onClick={() => removeJob(job.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedJobs;