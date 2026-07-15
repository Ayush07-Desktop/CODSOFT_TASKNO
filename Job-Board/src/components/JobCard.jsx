import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import "./JobCard.css";

function JobCard({
  id,
  title,
  company,
  location,
  salary,
  type,
  category,
  logo,
}) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    setFavorite(savedJobs.some((job) => job.id === id));
  }, [id]);

  const handleFavorite = () => {
    const savedJobs =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (favorite) {
      const updatedJobs = savedJobs.filter(
        (job) => job.id !== id
      );

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setFavorite(false);

      toast.info("Removed from Saved Jobs");
    } else {
      const newJob = {
        id,
        title,
        company,
        location,
        salary,
        type,
        category,
        logo,
      };

      savedJobs.push(newJob);

      localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
      );

      setFavorite(true);

      toast.success("Job saved successfully!");
    }
  };

  return (
    <div className="job-card">
      <div className="favorite-icon">
        {favorite ? (
          <FaHeart onClick={handleFavorite} />
        ) : (
          <FaRegHeart onClick={handleFavorite} />
        )}
      </div>

      <img
        src={logo}
        alt={company}
        className="company-logo"
      />

      <h2>{title}</h2>

      <span className="category-badge">
        {category}
      </span>

      <p>
        <FaBuilding /> <strong>Company:</strong> {company}
      </p>

      <p>
        <FaMapMarkerAlt /> <strong>Location:</strong> {location}
      </p>

      <p>
        <FaMoneyBillWave /> <strong>Salary:</strong> {salary}
      </p>

      <p>
        <FaBriefcase /> <strong>Type:</strong> {type}
      </p>

      <Link to={`/jobs/${id}`}>
        <button className="apply-btn-card">
          Apply Now
        </button>
      </Link>
    </div>
  );
}

export default JobCard;