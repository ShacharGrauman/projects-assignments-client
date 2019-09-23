import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle,faClipboardList,faUserLock,faCog,faLightbulb,faStar,faClipboardCheck,faListAlt,faPlus,faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
import logo from "../../../assets/amdocs.png";

const NavbarWidth='360px';

const styleNavbar ={
  position:'fixed',
  width:NavbarWidth,
  backgroundColor:'#f8f9fa',
  transition:'transform 0.228s ease-in',
  zIndex:'100',
  top:'0',
  height:'100vh'
}


export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state={
      open:false,
    }
    this.toggleNavbar = this.toggleNavbar.bind(this)
  }

  toggleNavbar(){
    this.setState({open:!this.state.open})
  }



  render() {
    return (<>
    
      <div>
        
        <h3 style={{position:'fixed', cursor:'pointer', top:'15px'}} className="m-3 mt-4" onClick={this.toggleNavbar} >&#9776;</h3>

        <div className="shadow" style={{ transform:this.state.open?`translateX(0)`:`translateX(-${NavbarWidth})`, ...styleNavbar}}>
        <Link to="/">
            <img src={logo} className="m-3" style={{ height: "25px" }} />
          </Link>
          <button type="button" className="close m-3 mb-5" onClick={this.toggleNavbar}>
              <span aria-hidden="true">&times;</span>
          </button>



          <ul className="list-group list-group-flush mt-4" >
            <li className="list-group-item list-group-item-action" style={{backgroundColor:'#f8f9fa'}} >
              <Link className="nav-link text-body" to="/">
              <FontAwesomeIcon icon={faHome} className="mr-2"/>
                 Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/users-list">
              <FontAwesomeIcon icon={faUserCircle} className="mr-2"/>
                Users
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/audit">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2"/>
                Audit
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/roles">
              <FontAwesomeIcon icon={faUserLock} className="mr-2"/>
                Roles
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/settings">
              <FontAwesomeIcon icon={faCog} className="mr-2"/>
                Settings
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/projects">
              <FontAwesomeIcon icon={faLightbulb} className="mr-2"/>
                My Projects
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/my-skills/3">
              <FontAwesomeIcon icon={faStar} className="mr-2"/>
                My Skills
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/pending-assignment-request">
              <FontAwesomeIcon icon={faListAlt} className="mr-2"/>
                Pending Assignment Request
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar} style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/add-new-project">
              <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                Add New Project
              </Link>
            </li>
            <li className="list-group-item list-group-item-action" onClick={this.toggleNavbar}style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/done-assignments">
              <FontAwesomeIcon icon={faClipboardCheck} className="mr-2"/>
                Done Assigments
              </Link>
            </li>
            <li className="list-group-item list-group-item-action"  onClick={this.toggleNavbar}style={{backgroundColor:'#f8f9fa'}}>
              <Link className="nav-link text-body" to="/pendingSkills/1">
              <FontAwesomeIcon icon={faStarHalfAlt} className="mr-2"/>
                Pending Skills
              </Link>
            </li>
          </ul>




        </div>
      </div>
    </>
      )
    }
  }









