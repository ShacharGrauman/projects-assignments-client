import React from 'react';
import InputErrors from '../shared-components/InputErrors'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default class UsersTableRow extends React.Component{

    
    render(){
        if (this.props.errors.isEmpty){
            return <InputErrors/>;
        }
        
        return (
            <tr>
                <td><Link to={`/user-profile/${this.props.user.id}`}>{this.props.user.number}</Link></td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.roles}</td>
                <td>{this.props.user.department}</td>
                <td>{this.props.user.worksite}</td>
            </tr>
        );
    }
}