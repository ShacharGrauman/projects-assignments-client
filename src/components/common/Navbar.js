import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle, faClipboardList, faUserLock, faCog, faLightbulb, faStar, faClipboardCheck, faListAlt, faPlus, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import logo from "../../../assets/amdocs.png";


import {DataContext} from './Provider/DataProvider'

const NavbarWidth = '360px';

const styleNavbar = {
  position: 'fixed',
  width: NavbarWidth,
  backgroundColor: '#f8f9fa',
  transition: 'transform 0.228s ease-in',
  zIndex: '100',
  top: '0',
  height: '95vh'
}


export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false      
    };

    this.navbarMenu = [
      {
        icon: faHome,
        path: '/',
        name: 'Home',
        role:['admin','manager','employee']
      },
      {
        icon: faUserCircle,
        path: '/users-list',
        name: 'Users',
        role:['admin']
      },
      {
        icon: faClipboardList,
        path: '/audit',
        name: 'Audit',
        role:['admin']
      },
      {
        icon: faUserLock,
        path: '/roles',
        name: 'Roles',
        role:['admin']
      },
      {
        icon: faCog,
        path: '/settings/add/roles',
        name: 'Settings',
        role:['admin']
      },
      {
        icon: faLightbulb,
        path: '/projects',
        name: 'My Projects',
        role:['manager']
      },
      {
        icon: faStar,
        path: '/my-skills/0',
        name: 'My Skills',
        role:['employee','manager']
      },
      {
        icon: faListAlt,
        path: '/pending-assignment-request',
        name: 'Pending Assignment Request',
        role:['manager']
      },
      {
        icon: faClipboardCheck,
        path: '/done-assignments',
        name: 'Done Assigments',
        role:['manager']
      },
      {
        icon: faStarHalfAlt,
        path: '/pendingSkills/0',
        name: 'Pending Skills',
        role:['manager']
      },
      {
        icon: faStarHalfAlt,
        path: '/assign-history/',
        name: 'My Assignments',
        role:['employee']
      },
    ];
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar() {
    this.setState({ open: !this.state.open })
  }
  render() {
    return (<>

      <div>

        <h3 style={{ position: 'fixed', cursor: 'pointer', top: '25px',  zIndex: '100' }} className="m-3 mt-4" onClick={this.toggleNavbar} >&#9776;</h3>

        <div className="shadow" style={{ transform: this.state.open ? `translateX(0)` : `translateX(-${NavbarWidth})`, ...styleNavbar }}>

          <img src={logo} className="m-3" style={{ height: "25px" }} />
          <button type="button" className="close m-3 mb-5" onClick={this.toggleNavbar}>
            <span aria-hidden="true">&times;</span>
          </button>

          <ul className="list-group list-group-flush mt-4" >
            {
            
              (() => {
                let role = this.context.data.authValues.role;       

                const roleName = role?role.name:''              

              return this.navbarMenu.map((menuItem,index)=> {
                
                if (menuItem.role.includes(roleName)){
                 return (<li
                  key={index} className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{ backgroundColor: '#f8f9fa' }}>
                   <Link className="nav-link text-body" to={menuItem.path}>
                     <FontAwesomeIcon icon={menuItem.icon} className="mr-2" />
                     {menuItem.name}
                   </Link>
                 </li>)}
              })
            })()
            }
              
            
          </ul>
        </div>
      </div>
    </>
    )
  }
}



Navbar.contextType = DataContext



