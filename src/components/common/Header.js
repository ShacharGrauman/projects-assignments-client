import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/amdocs.png";
export default class Header extends React.Component {
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

          {/* <FontAwesomeIcon
            // className="justify-content-right"
            // style={{ cursor: "pointer" }}
            // title="Logout"
            // size="2x"
            icon={signOutAlt}
          /> */}
          <Link to="/login" class="btn btn-outline-danger" >Logout</Link>
        </nav>
      </>
    );
  }
}
