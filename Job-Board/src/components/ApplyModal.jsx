import { useState } from "react";
import "./ApplyModal.css";

function ApplyModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("Please fill all the fields.");
      return;
    }

    alert("🎉 Application Submitted Successfully!");

    setName("");
    setEmail("");
    setPhone("");

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Apply for this Job</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input type="file" />

          <div className="modal-buttons">
            <button
              type="submit"
              className="submit-btn"
            >
              Submit Application
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyModal;