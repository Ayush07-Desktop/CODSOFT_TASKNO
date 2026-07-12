import JobCard from "./JobCard";
import "./FeaturedJobs.css";

function FeaturedJobs({ jobs }) {
  return (
    <section className="featured-jobs">
      <h1>Featured Jobs</h1>

      <div className="jobs-container">
        {jobs.slice(0, 3).map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            salary={job.salary}
            type={job.type}
            category={job.category}
            logo={job.logo}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedJobs;