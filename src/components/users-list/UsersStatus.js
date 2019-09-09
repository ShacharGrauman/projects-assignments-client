import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp, faUsers, faUserTie, faCity, faNetworkWired } from '@fortawesome/free-solid-svg-icons'


export default class UsersStatus extends React.Component{

    render(){
        return(

            <div>
                <div className="row mb-2 d-flex align-items-stretch justify-content-center">
                    <div className="col-sm-3 w-100">
                        <div className="card text-center my-1" style={{backgroundColor : "rgb(220,220,220)"}}>
                            <div className="card-body p-1">
                                <FontAwesomeIcon 
                                    icon={faUsers}
                                    size="4x" style={{color:'rgb(80,80,80)'}}
                                    >
                                </FontAwesomeIcon>
                                <p className="card-text my-0">Users</p>
                                <hr className="my-1"></hr>
                                <span><h4>3452</h4></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 w-100">
                        <div className="card text-center my-1" style={{backgroundColor : "rgb(220,220,220)"}}>
                            <div className="card-body p-1">
                                <FontAwesomeIcon
                                    icon={faUserTie}
                                    size="4x" style={{color:'rgb(80,80,80)'}}
                                    >
                                </FontAwesomeIcon>
                                <p className="card-text my-0">Roles</p>
                                <hr className="my-1"></hr>
                                <span><h4>7</h4></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 w-100">
                        <div className="card text-center my-1" style={{backgroundColor : "rgb(220,220,220)"}}>
                            <div className="card-body p-1">
                                <FontAwesomeIcon
                                    icon={faNetworkWired}
                                    size="4x" style={{color:'rgb(80,80,80)'}}
                                    >
                                </FontAwesomeIcon>
                                <p className="card-text my-0 ">Departments</p>
                                <hr className="my-1"></hr>
                                <span><h4>23</h4></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 w-100">
                        <div className="card text-center my-1" style={{backgroundColor : "rgb(220,220,220)"}}>
                            <div className="card-body p-1">
                                <FontAwesomeIcon
                                    icon={faCity}
                                    size="4x" style={{color:'rgb(80,80,80)'}}
                                    >
                                </FontAwesomeIcon>
                                <p className="card-text my-0">Work Sites</p>
                                <hr className="my-1"></hr>
                                <span><h4>12</h4></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}