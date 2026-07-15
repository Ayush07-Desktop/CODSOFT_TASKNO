import {
  FaBriefcase,
  FaUsers,
  FaSearch,
  FaLaptopCode,
} from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>About JobBoard</h1>

        <p>
          JobBoard is a modern job portal built to connect talented
          candidates with top companies. Our platform helps job seekers
          discover opportunities while enabling recruiters to manage job
          postings efficiently.
        </p>
      </section>

      <section className="about-features">

        <h2>Why Choose JobBoard?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <FaSearch className="feature-icon" />
            <h3>Smart Job Search</h3>
            <p>
              Quickly search and filter jobs by company, location,
              category and job type.
            </p>
          </div>

          <div className="feature-card">
            <FaBriefcase className="feature-icon" />
            <h3>Top Companies</h3>
            <p>
              Explore opportunities from leading companies across
              different industries.
            </p>
          </div>

          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Recruiter Dashboard</h3>
            <p>
              Recruiters can add, edit and manage jobs using an
              easy-to-use admin dashboard.
            </p>
          </div>

          <div className="feature-card">
            <FaLaptopCode className="feature-icon" />
            <h3>Built with React</h3>
            <p>
              Developed using React, React Router, LocalStorage,
              Toastify and Recharts.
            </p>
          </div>

        </div>

      </section>

      <section className="mission">

        <h2>Our Mission</h2>

        <p>
          Our mission is to simplify the hiring process by providing a
          fast, secure and user-friendly platform where companies can
          find talented candidates and job seekers can discover their
          dream careers.
        </p>

      </section>

    </div>
  );
}

export default About;