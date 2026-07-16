import { useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import "./Admin.css";

function Admin({ jobs, setJobs }) {
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full Time",
    category: "",
    description: "",
    logo: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // ==============================
  // Dashboard Analytics
  // ==============================

  const totalJobs = jobs.length;

  const fullTimeJobs = jobs.filter(
    (job) => job.type === "Full Time"
  ).length;

  const remoteJobs = jobs.filter(
    (job) => job.type === "Remote"
  ).length;

  const internshipJobs = jobs.filter(
    (job) => job.type === "Internship"
  ).length;

  const savedJobs =
    JSON.parse(localStorage.getItem("savedJobs")) || [];

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  // ==============================
  // Pie Chart Data
  // ==============================

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
  ];

  const jobTypeData = [
    {
      name: "Full Time",
      value: fullTimeJobs,
    },
    {
      name: "Remote",
      value: remoteJobs,
    },
    {
      name: "Internship",
      value: internshipJobs,
    },
  ];

  // ==============================
  // Bar Chart Data
  // ==============================

  const categoryMap = {};

  jobs.forEach((job) => {
    categoryMap[job.category] =
      (categoryMap[job.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map(
    (key) => ({
      category: key,
      jobs: categoryMap[key],
    })
  );

  // ==============================
  // Search Filter
  // ==============================

  const filteredJobs = jobs.filter((job) => {
    const keyword = search.toLowerCase();

    return (
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.location.toLowerCase().includes(keyword)
    );
  });

  // ==============================
  // Add / Update Job
  // ==============================

  const handleAddJob = () => {
    if (
      !newJob.title ||
      !newJob.company ||
      !newJob.location ||
      !newJob.salary ||
      !newJob.category ||
      !newJob.description
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (editingId !== null) {
      const updatedJobs = jobs.map((job) =>
        job.id === editingId
          ? {
            ...job,
            ...newJob,
          }
          : job
      );

      setJobs(updatedJobs);

      toast.success("Job Updated Successfully!");

      setEditingId(null);
    } else {
      const job = {
        id: Date.now(),
        ...newJob,
      };

      setJobs([...jobs, job]);

      toast.success("Job Added Successfully!");
    }

    setNewJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      type: "Full Time",
      category: "",
      description: "",
      logo: "",
    });
  };

  // ==============================
  // Delete Job
  // ==============================

  const handleDeleteJob = (id) => {
    if (!window.confirm("Delete this job?")) return;

    setJobs(jobs.filter((job) => job.id !== id));

    toast.success("Job Deleted Successfully!");
  };

  // ==============================
  // Edit Job
  // ==============================

  const handleEditJob = (job) => {
    setEditingId(job.id);

    setNewJob({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      type: job.type,
      category: job.category,
      description: job.description,
      logo: job.logo,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Recruiter Dashboard</h1>

      <p className="admin-subtitle">
        Manage all jobs from one place.
      </p>

      {/* ================= Dashboard Cards ================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>📋 Total Jobs</h2>
          <p>{totalJobs}</p>
        </div>

        <div className="dashboard-card">
          <h2>💼 Full Time</h2>
          <p>{fullTimeJobs}</p>
        </div>

        <div className="dashboard-card">
          <h2>🌍 Remote</h2>
          <p>{remoteJobs}</p>
        </div>

        <div className="dashboard-card">
          <h2>🎓 Internship</h2>
          <p>{internshipJobs}</p>
        </div>

        <div className="dashboard-card">
          <h2>❤️ Saved Jobs</h2>
          <p>{savedJobs.length}</p>
        </div>

        <div className="dashboard-card">
          <h2>📨 Applications</h2>
          <p>{applications.length}</p>
        </div>

      </div>

      {/* ================= Charts ================= */}

      <div className="charts-container">

        <div className="chart-card">
          <h2>Job Types</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={jobTypeData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {jobTypeData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

        <div className="chart-card">
          <h2>Jobs by Category</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="category" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="jobs"
                fill="#2563eb"
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* ================= Add / Edit Form ================= */}

      <div className="job-form">

        <h2>
          {editingId ? "Edit Job" : "Add New Job"}
        </h2>

        <div className="form-grid">

          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                title: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Company"
            value={newJob.company}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                company: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={newJob.location}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                location: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Salary"
            value={newJob.salary}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                salary: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={newJob.category}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                category: e.target.value,
              })
            }
          />

          <select
            value={newJob.type}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                type: e.target.value,
              })
            }
          >
            <option>Full Time</option>
            <option>Remote</option>
            <option>Internship</option>
          </select>

          <div style={{ gridColumn: "1 / 3" }}>
            <label>
              <strong>Company Logo</strong>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) return;

                const reader = new FileReader();

                reader.onloadend = () => {
                  setNewJob((prev) => ({
                    ...prev,
                    logo: reader.result,
                  }));
                };

                reader.readAsDataURL(file);
              }}
            />
          </div>

          <textarea
            placeholder="Job Description"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({
                ...newJob,
                description: e.target.value,
              })
            }
            style={{
              gridColumn: "1 / 3",
              height: "120px",
            }}
          />

          <button
            className="add-btn"
            onClick={handleAddJob}
          >
            {editingId ? "Update Job" : "+ Add Job"}
          </button>

        </div>

      </div>

      {/* ================= Search ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >

        <h2>Current Jobs</h2>

        <input
          type="text"
          placeholder="🔍 Search Jobs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

      </div>

      {/* ================= Jobs Table ================= */}

      <table className="job-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>
                  {job.logo ? (
                    <img
                      src={job.logo}
                      alt={job.company}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>

                <td>{job.title}</td>

                <td>{job.company}</td>

                <td>{job.location}</td>

                <td>{job.type}</td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => handleEditJob(job)}
                      title="Edit"
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      title="Delete"
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "25px",
                  fontWeight: "bold",
                  color: "#666",
                }}
              >
                No matching jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;