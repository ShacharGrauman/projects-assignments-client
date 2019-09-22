import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const NavbarWidth = "240px";

const styleNavbar = {
  // position: "fixed",
  position:"absolute",
  marginTop:"42px",
  width: NavbarWidth,
  backgroundColor: "rgb(210,210,210)",
  transition: "transform 0.228s ease-in",
  zIndex: "100",
  top: "0",
  height: "110vh"
};

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  toggleNavbar() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <>
        <div>
          <h3
            style={{ position: "absolute", cursor: "pointer", top: "25px" }}
            className="m-4"
            onClick={this.toggleNavbar}
          >
            &#9776;
          </h3>

<<<<<<< HEAD
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
              <Link className="nav-link" to="/projects">
                My Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-skills/3">
                My Skills
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pending-assignment-request">
                Pending Assignment Request
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-new-project">
                Add New Project
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/done-assignments">
                Done Assigments
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/pendingSkills/1">
                Pending Skills
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
=======
          <div
            className="p-3"
            style={{
              transform: this.state.open
                ? `translateX(0)`
                : `translateX(-${NavbarWidth})`,
              ...styleNavbar
            }}
          >
>>>>>>> origin/master
            <button
              type="button"
              className="close "
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <ul className="navbar-nav m-4">
              <li className="nav-item mb-2 active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/users-list">
                  Users
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/audit">
                  Audit
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/roles">
                  Roles
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/projects">
                  My Projects
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/my-skills/3">
                  My Skills
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/pending-assignment-request">
                  Pending Assignment Request
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/add-new-project">
                  Add New Project
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/done-assignments">
                  Done Assigments
                </Link>
              </li>
              <li className="nav-item mb-2" onClick={this.toggleNavbar}>
                <Link className="nav-link" to="/pendingSkills/1">
                  Pending Skills
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
