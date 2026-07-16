import { useState } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      toast.error("Please fill all fields!");
      return;
    }

    toast.success("Login Successful!");

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>Login to continue exploring jobs.</p>

        <form onSubmit={handleLogin}>

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

          <button type="submit" className="login-btn">
            <FaSignInAlt />
            Login
          </button>

        </form>

        <div className="login-footer">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </div>

      </div>

    </div>
  );
}

export default Login;