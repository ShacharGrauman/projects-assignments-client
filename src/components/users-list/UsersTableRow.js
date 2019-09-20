import React from 'react';
import InputErrors from '../shared-components/InputErrors'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default class UsersTableRow extends React.Component{

    
    render(){
        return (
            <tr>
                <td><Link to={`/user-profile/${this.props.user.id}`}>{this.props.user.number}</Link></td>
                <td>{this.props.user.firstName.concat(' ', this.props.user.lastName)}</td>
                <td>{this.props.roles.map(role =>  
                        role.name.concat(', ')
                        )
                    }</td>
                <td>{this.props.user.department}</td>
                <td>{this.props.user.worksite.name}</td>
            </tr>
        );
    }
}