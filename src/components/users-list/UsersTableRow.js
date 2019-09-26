import React from 'react';
import InputErrors from '../shared-components/InputErrors'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock, faBan} from "@fortawesome/free-solid-svg-icons";



export default class UsersTableRow extends React.Component{

    
    render(){
        return (
            <tr>
                <td>
                    {this.props.user.deactivated && <FontAwesomeIcon className="mx-1" icon={faBan} style={{color:'rgb(255,10,20)'}} ></FontAwesomeIcon>}
                    {this.props.user.locked && <FontAwesomeIcon className="mx-1" icon={faLock} style={{color:'rgb(60,60,60)'}} ></FontAwesomeIcon>}
                </td>
                <td><Link to={`/user-profile/${this.props.user.id}`}>{this.props.user.number}</Link></td>
                <td>{this.props.user.firstName.concat(' ', this.props.user.lastName)}</td>
                <td>{this.props.roles.map(role => role.name).join(', ')}</td>
                <td>{this.props.user.department}</td>
                <td>{this.props.user.worksite.name}</td>
            </tr>
        );
    }
}