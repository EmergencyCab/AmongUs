import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2 style={{ color: "#4a90e2", marginBottom: "10px" }}>AMONGUS</h2>
        <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
          <div
            className="character red"
            style={{ width: "20px", height: "20px" }}
          ></div>
          <div
            className="character blue"
            style={{ width: "20px", height: "20px" }}
          ></div>
          <div
            className="character green"
            style={{ width: "20px", height: "20px" }}
          ></div>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" className={isActive("/create")}>
              Create a Crewmate!
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={isActive("/gallery")}>
              Crewmate Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
