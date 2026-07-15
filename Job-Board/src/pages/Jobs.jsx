import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import JobCard from "../components/JobCard";
import "./Jobs.css";

function Jobs({ jobs }) {

  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const searchValue = searchParams.get("search") || "";
    setSearch(searchValue);
  }, [searchParams]);

  const [jobType, setJobType] =
    useState("All");

  const [category, setCategory] =
    useState("All");

  // Unique Categories

  const categories = [
    "All",
    ...new Set(
      jobs.map((job) => job.category)
    ),
  ];

  // Filter Jobs

  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      job.company
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      job.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesType =
      jobType === "All" ||
      job.type === jobType;

    const matchesCategory =
      category === "All" ||
      job.category === category;

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory
    );
  });

  const clearFilters = () => {
    setSearch("");
    setJobType("All");
    setCategory("All");
  };

  return (
    <div className="jobs-page">

      <h1>Available Jobs</h1>

      <div className="filter-container">

        <input
          type="text"
          placeholder="🔍 Search by title, company or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-box"
        />

        <select
          value={jobType}
          onChange={(e) =>
            setJobType(e.target.value)
          }
          className="job-type-filter"
        >
          <option value="All">
            All Job Types
          </option>

          <option value="Full Time">
            Full Time
          </option>

          <option value="Remote">
            Remote
          </option>

          <option value="Internship">
            Internship
          </option>

        </select>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="job-type-filter"
        >

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}

        </select>

        <button
          className="clear-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

      {search && (
        <div className="search-result-box">
          <h3>
            🔍 Search Results for:
            <span> "{search}"</span>
          </h3>
        </div>
      )}

      <p className="job-count">
        Showing <strong>{filteredJobs.length}</strong> job(s)
      </p>

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