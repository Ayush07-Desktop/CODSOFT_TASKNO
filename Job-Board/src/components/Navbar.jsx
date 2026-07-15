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
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value === "") {
      navigate("/jobs");
    } else {
      navigate(`/jobs?search=${encodeURIComponent(value)}`);
    }

    closeMenu();
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <FaBriefcase className="logo-icon" />
            <span>JobBoard</span>
          </Link>
        </div>

        <div className="mobile-actions">
          <button
            type="button"
            className="theme-toggle mobile-theme-toggle"
            onClick={handleThemeToggle}
            title={
              darkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <div className={`navbar-content ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/jobs" onClick={closeMenu}>
              Jobs
            </NavLink>
          </li>

          <li>
            <NavLink to="/companies" onClick={closeMenu}>
              Companies
            </NavLink>
          </li>

          <li>
            <NavLink to="/applied" onClick={closeMenu}>
              Applied Jobs
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin" onClick={closeMenu}>
              Admin
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" onClick={closeMenu}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/saved" onClick={closeMenu}>
              Saved Jobs
            </NavLink>
          </li>
        </ul>

        <form
          className="navbar-search"
          onSubmit={handleSearch}
        >
          <FaSearch />

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <button
          type="button"
          className="theme-toggle desktop-theme-toggle"
          onClick={handleThemeToggle}
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="buttons">
          <Link
            to="/login"
            className="login"
            onClick={closeMenu}
          >
            <FaUserCircle />
            Login
          </Link>

          <Link
            to="/register"
            className="register"
            onClick={closeMenu}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;