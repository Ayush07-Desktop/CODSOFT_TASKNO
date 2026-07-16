import { Link } from "react-router-dom";
import "./Companies.css";

function Companies({ jobs }) {
  const companies = [];

  jobs.forEach((job) => {
    const existing = companies.find(
      (company) => company.name === job.company
    );

    if (existing) {
      existing.count += 1;
    } else {
      companies.push({
        name: job.company,
        logo: job.logo,
        count: 1,
      });
    }
  });

  return (
    <div className="companies-page">
      <h1>Top Hiring Companies</h1>

      <div className="companies-grid">
        {companies.map((company) => (
          <div
            className="company-card"
            key={company.name}
          >
            <img
              src={company.logo}
              alt={company.name}
              className="company-logo"
            />

            <h2>{company.name}</h2>

            <p>{company.count} Open Position(s)</p>

            <Link
              to={`/jobs?company=${encodeURIComponent(company.name)}`}
            >
              <button>View Jobs</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;