import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle, faClipboardList, faUserLock, faCog, faLightbulb, faStar, faClipboardCheck, faListAlt, faPlus, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import logo from "../../../assets/amdocs.png";

const NavbarWidth = '360px';

const styleNavbar = {
  position: 'fixed',
  width: NavbarWidth,
  backgroundColor: '#f8f9fa',
  transition: 'transform 0.228s ease-in',
  zIndex: '100',
  top: '0',
  height: '95vh',
  overflow: 'scroll'
}


export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      navbarMenu: [
        {
          icon: faHome,
          path: '/',
          name: 'Home'
        },
        {
          icon: faUserCircle,
          path: '/users-list',
          name: 'Users'
        },
        {
          icon: faClipboardList,
          path: '/audit',
          name: 'Audit'
        },
        {
          icon: faUserLock,
          path: '/roles',
          name: 'Roles'
        },
        {
          icon: faCog,
          path: '/settings/add/roles',
          name: 'Settings'
        },
        {
          icon: faLightbulb,
          path: '/projects',
          name: 'My Projects'
        },
        {
          icon: faStar,
          path: '/my-skills/3',
          name: 'My Skills'
        },
        {
          icon: faListAlt,
          path: '/pending-assignment-request',
          name: 'Pending Assignment Request'
        },
        {
          icon: faPlus,
          path: '/add-new-project',
          name: 'Add New Project'
        },
        {
          icon: faClipboardCheck,
          path: '/done-assignments',
          name: 'Done Assigments'
        },
        {
          icon: faStarHalfAlt,
          path: '/pendingSkills/1',
          name: 'Pending Skills'
        },
      ]
    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ open: !this.state.open })
  }



  render() {
    return (<>

      <div>

        <h3 style={{ position: 'fixed', cursor: 'pointer', top: '15px',  zIndex: '100' }} className="m-3 mt-4" onClick={this.toggleNavbar} >&#9776;</h3>

        <div className="shadow" style={{ transform: this.state.open ? `translateX(0)` : `translateX(-${NavbarWidth})`, ...styleNavbar }}>

          <img src={logo} className="m-3" style={{ height: "25px" }} />
          <button type="button" className="close m-3 mb-5" onClick={this.toggleNavbar}>
            <span aria-hidden="true">&times;</span>
          </button>



          <ul className="list-group list-group-flush mt-4" >
            {
              this.state.navbarMenu.map((menuItem,index)=>
                <li key={index} className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{ backgroundColor: '#f8f9fa' }}>
                  <Link className="nav-link text-body" to={menuItem.path}>
                    <FontAwesomeIcon icon={menuItem.icon} className="mr-2" />
                    {menuItem.name}
                  </Link>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </>
    )
  }
}









