import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="">
          Amdocs
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users-list">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/audit">
                Audit
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/roles">
                Roles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/settings">
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-team">
                My Team
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                My Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pending-assignment-request">
                Pending Assignment Request 
              </Link>
            </li>
            <li className="nav-item">
                 <Link className="nav-link" to="/pendingSkills/1">Pending Skills</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
              <input className="form- control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>);
    }
}