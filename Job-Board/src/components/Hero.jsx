import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <h1>
          Find Your <span>Dream Job</span> Today
        </h1>

        <p>
          Discover thousands of opportunities from top companies.
          Build your career with the right job.
        </p>

        <div className="hero-buttons">
          <Link to="/jobs">
            <button className="primary-btn">
              Browse Jobs
            </button>
          </Link>

          <Link to="/admin">
            <button className="secondary-btn">
              Post a Job
            </button>
          </Link>
        </div>

        <div className="hero-stats">

          <div className="stat-card">
            <FaBriefcase />
            <h3>1000+</h3>
            <p>Jobs</p>
          </div>

          <div className="stat-card">
            <FaBuilding />
            <h3>250+</h3>
            <p>Companies</p>
          </div>

          <div className="stat-card">
            <FaMapMarkerAlt />
            <h3>50+</h3>
            <p>Cities</p>
          </div>

          <div className="stat-card">
            <FaUsers />
            <h3>10K+</h3>
            <p>Candidates</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;