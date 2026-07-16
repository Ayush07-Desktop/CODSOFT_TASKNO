import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaInstagram,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Company */}

        <div className="footer-section">
          <h2>JobBoard</h2>

          <p>
            Find your dream job with thousands of opportunities from top companies around the world.
          </p>
        </div>

        {/* Quick Links */}

        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/jobs">Jobs</Link>

          <Link to="/companies">Companies</Link>

          <Link to="/admin">Admin</Link>
        </div>

        {/* Contact */}

        <div className="footer-section">
          <h3>Contact</h3>

          <p>
            <FaEnvelope /> senapatiayush07@gmail.com
          </p>

          <p>
            <FaPhone /> +91 7847087826
          </p>
        </div>

        {/* Social */}

        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">

            <a
              href="https://github.com/Ayush07-Desktop"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/ayush-kumar-senapati-718000289/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

             <a
              href="https://www.instagram.com/ig_pikachu__07/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>

          </div>

        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 JobBoard. All Rights Reserved.
      </p>

    </footer>
  );
}

export default Footer;