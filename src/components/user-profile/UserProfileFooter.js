import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class UserProfileFooter extends React.Component{
    render(){
        return(
            <>
                <div className="card position-relative d-flex flex-row bd-highlight p-2 mb-2" style={{bottom:"0"}}>
                    {
                        this.props.isLocked ?
                    <button className="btn btn-info ml-auto mr-2" onClick={this.props.toggleLockUser}>Activate</button>
                    :
                    <>
                        <div className=" ">
                            {!this.props.addUserForm && 
                            

                            <div className="btn-group dropup" style={{cursor:'pointer'}}>
                                <button type="button" className="btn btn-secondary dropdown-toggle ml-2 btn btn-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Options
                                </button>
                                <div className="dropdown-menu">
                                    <h6 className="dropdown-item" onClick={this.props.deactivateUser}>Deactivate User</h6>
                                    <h6 className="dropdown-item" to="/">Direct Message</h6>
                                    <h6 className="dropdown-item" to="/">Reset Password</h6>
                                </div>
                            </div>
                            }
                        </div>

                        <button className='ml-auto btn btn-danger mr-2'><Link to="/users-list" style={{color:'white', textDecoration:'none'}}>Cancel</Link></button>
                        <div className="mr-2">
                            {this.props.addUserForm?
                            <button className="btn btn-success" onClick={this.props.printRoles} onClick={this.props.addUser}>Finish</button>
                            :
                            <button className="btn btn-success">Apply</button>
                            }
                        </div>
                    </>
                    }

                </div>
            </>
        )
    }
}