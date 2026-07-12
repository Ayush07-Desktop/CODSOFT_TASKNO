import { useState } from "react";

function Admin({ jobs, setJobs }) {
    const [newJob, setNewJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "Full Time",
        category: "",
        description: "",
    });

    const handleAddJob = () => {
        if (
            !newJob.title ||
            !newJob.company ||
            !newJob.location ||
            !newJob.salary ||
            !newJob.category ||
            !newJob.description
        ) {
            alert("Please fill all fields.");
            return;
        }

        const job = {
            id: jobs.length + 1,
            ...newJob,
            logo: "",
        };

        setJobs([...jobs, job]);

        setNewJob({
            title: "",
            company: "",
            location: "",
            salary: "",
            type: "Full Time",
            category: "",
            description: "",
        });

        alert("✅ Job added successfully!");
    };

    return (
        <div
            style={{
                maxWidth: "1000px",
                margin: "40px auto",
                padding: "20px",
            }}
        >
            <h1>Recruiter Dashboard</h1>

            <p>Manage all jobs from here.</p>

            <hr />

            <h2>Add New Job</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                    marginTop: "20px",
                    marginBottom: "30px",
                }}
            >
                <input
                    type="text"
                    placeholder="Job Title"
                    value={newJob.title}
                    onChange={(e) =>
                        setNewJob({ ...newJob, title: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Company"
                    value={newJob.company}
                    onChange={(e) =>
                        setNewJob({ ...newJob, company: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={newJob.location}
                    onChange={(e) =>
                        setNewJob({ ...newJob, location: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Salary"
                    value={newJob.salary}
                    onChange={(e) =>
                        setNewJob({ ...newJob, salary: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={newJob.category}
                    onChange={(e) =>
                        setNewJob({ ...newJob, category: e.target.value })
                    }
                />

                <select
                    value={newJob.type}
                    onChange={(e) =>
                        setNewJob({ ...newJob, type: e.target.value })
                    }
                >
                    <option>Full Time</option>
                    <option>Remote</option>
                    <option>Internship</option>
                </select>

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
                        padding: "10px",
                    }}
                />

                <button
                    onClick={handleAddJob}
                    style={{
                        gridColumn: "1 / 3",
                        padding: "12px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    + Add Job
                </button>
            </div>

            <h2>Total Jobs: {jobs.length}</h2>

            <br />

            <h2>Current Jobs</h2>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>Title</th>
                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>Company</th>
                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>Location</th>
                        <th style={{ border: "1px solid #ddd", padding: "10px" }}>Type</th>
                    </tr>
                </thead>

                <tbody>
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {job.title}
                            </td>

                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {job.company}
                            </td>

                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {job.location}
                            </td>

                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {job.type}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
