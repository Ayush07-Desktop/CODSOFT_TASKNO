import { useState } from "react";
import JobCard from "../components/JobCard";
import "./Jobs.css";


function Jobs({ jobs }) {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("All");


  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      jobType === "All" || job.type === jobType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>

      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <select
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        className="job-type-filter"
      >
        <option value="All">All</option>
        <option value="Full Time">Full Time</option>
        <option value="Remote">Remote</option>
      </select>

      <div className="job-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
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
          ))
        ) : (
          <h2>No jobs found.</h2>
        )}
      </div>
    </div>
  );
}

export default Jobs;