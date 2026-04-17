import { NavLink } from "react-router-dom";
import { FaTruck, FaUndo, FaMapMarkerAlt } from "react-icons/fa";
import "./index.css";

export default function Layout({ children, title }) {
  return (
    <div className="container">

      <div className="sidebar">
        <h2 className="logo">Main Menu</h2>

        <NavLink to="/" className="nav-item">
          <FaTruck className="icon" /> Dispatch Entry
        </NavLink>

        <NavLink to="/return" className="nav-item">
          <FaUndo className="icon" /> Return Entry
        </NavLink>

        <NavLink to="/tracker" className="nav-item">
          <FaMapMarkerAlt className="icon" /> Location Tracker
        </NavLink>
      </div>

      <div className="main">
        <div className="header">
          <h2>{title}</h2>
        </div>
        {children}
      </div>

    </div>
  );
}