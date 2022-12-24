import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="navbar">
      <Link to="/" className={`nav_link ${pathname === "/" && "active_link"}`}>
        Home
      </Link>
      <Link
        to="/database"
        className={`nav_link ${pathname === "/database" && "active_link"}`}
      >
        Database
      </Link>
    </div>
  );
};

export default Navbar;
