import { useState } from "react";
import { toast } from "react-toastify";
import "./ApplyModal.css";

function ApplyModal({ isOpen, onClose, job }) {
  const [application, setApplication] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (
      !application.name ||
      !application.email ||
      !application.phone ||
      !application.resume
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    const savedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    savedApplications.push({
      ...application,

      jobTitle: job.title,
      company: job.company,
      logo: job.logo,
      location: job.location,

      appliedDate: new Date().toLocaleDateString(),
    });

    localStorage.setItem(
      "applications",
      JSON.stringify(savedApplications)
    );

    toast.success("Application submitted successfully!");

    setApplication({
      name: "",
      email: "",
      phone: "",
      resume: "",
      coverLetter: "",
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Apply for this Job</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={application.name}
          onChange={(e) =>
            setApplication({
              ...application,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={application.email}
          onChange={(e) =>
            setApplication({
              ...application,
              email: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={application.phone}
          onChange={(e) =>
            setApplication({
              ...application,
              phone: e.target.value,
            })
          }
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setApplication({
              ...application,
              resume: e.target.files[0]?.name || "",
            })
          }
        />

        <textarea
          placeholder="Cover Letter"
          rows="5"
          value={application.coverLetter}
          onChange={(e) =>
            setApplication({
              ...application,
              coverLetter: e.target.value,
            })
          }
        />

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Application
        </button>

      </div>
    </div>
  );
}

export default ApplyModal;