import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>JobBoard</h2>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/admin">Admin</Link></li>
      </ul>

      <div className="buttons">
        <Link to="/login">
          <button className="login">Login</button>
        </Link>

        <Link to="/register">
          <button className="register">Register</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;