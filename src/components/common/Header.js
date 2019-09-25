import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/amdocs.png";
import Api from "../Assigments/Api";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  async logout() {
    await Api.logout();
  }
  render() {
    return (
      <>
        <nav
          style={{ borderBottom: "1px solid purple" }}
          className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between"
        >
          <Link to="/">
            <img src={logo} className="" style={{ height: "25px" }} />
          </Link>
          <Link to="/">
          <button className="btn btn-outline-danger" onClick={this.logout}>
            Logout
          </button>
          </Link>
        </nav>
      </>
    );
  }
}
