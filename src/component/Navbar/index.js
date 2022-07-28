import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <h1 className="navbar-brand" href="#">
          ReactForm Data
        </h1>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        <Link className=" btn btn-outline-light" to="/formdata">
          Add Users
        </Link> 
      </div>
    </nav>
  );
};

export default Navbar;
