import React from "react";
import { Link, useLocation } from "react-router-dom";
import crewmates from "../assets/crewmates.png";

const SideNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div className="sidenav">
      <div className="sidenav-image">
        <img src={crewmates} alt="Among Us Crewmates" />
      </div>

      <div className="sidenav-links">
        <Link to="/" className={isActive("/")}>
          <h3>Home</h3>
        </Link>
        <Link to="/new" className={isActive("/new")}>
          <h3>Create a Crewmate!</h3>
        </Link>
        <Link to="/gallery" className={isActive("/gallery")}>
          <h3>Crewmate Gallery</h3>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
