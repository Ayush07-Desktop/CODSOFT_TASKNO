import { Link } from "react-router-dom";
import "./CTA.css";

function CTA() {
  return (
    <section className="cta">
      <h2>Ready to Find Your Dream Job?</h2>

      <p>
        Join thousands of professionals finding amazing opportunities every day.
      </p>

      <Link to="/jobs">
        <button>Explore Jobs</button>
      </Link>
    </section>
  );
}

export default CTA;