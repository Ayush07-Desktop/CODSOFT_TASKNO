import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "./Register.css";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    toast.success("Registration Successful!");

    setUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account 🚀</h1>

        <p>Join JobBoard and start your career journey.</p>

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <FaUser />
            <input
              type="text"
              placeholder="Full Name"
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email Address"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({
                  ...user,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <button className="register-btn">
            <FaUserPlus />
            Create Account
          </button>

        </form>

        <div className="register-footer">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>

      </div>

    </div>
  );
}

export default Register;