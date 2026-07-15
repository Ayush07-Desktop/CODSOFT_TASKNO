import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaBriefcase,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      navigate("/jobs");
      return;
    }

    navigate(`/jobs?search=${encodeURIComponent(search)}`);
  };

  return (
    <nav className="navbar">

      {/* Logo */}

      <div className="logo">
        <Link to="/">
          <FaBriefcase className="logo-icon" />
          <span>JobBoard</span>
        </Link>
      </div>

      {/* Navigation */}

      <ul className="nav-links">

        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/jobs">Jobs</NavLink>
        </li>

        <li>
          <NavLink to="/companies">Companies</NavLink>
        </li>

        <li>
          <NavLink to="/applied">Applied Jobs</NavLink>
        </li>

        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>

        <li>
          <NavLink to="/about">About</NavLink>
        </li>

        <li>
          <NavLink to="/saved">Saved Jobs</NavLink>
        </li>

      </ul>

      {/* Search */}

      <form
        className="navbar-search"
        onSubmit={handleSearch}
      >
        <FaSearch />

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </form>

      {/* Buttons */}

      <div className="buttons">

        <Link
          to="/login"
          className="login"
        >
          <FaUserCircle />
          Login
        </Link>

        <Link
          to="/register"
          className="register"
        >
          Register
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;