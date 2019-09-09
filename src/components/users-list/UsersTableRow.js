import React from 'react';
import InputErrors from '../../Errors/InputErrors'



export default class UsersTableRow extends React.Component{

    
    render(){
        if (this.props.errors.isEmpty){
            return <InputErrors/>;
        }
        
        return (
            <tr>
                <td>{this.props.user.number}</td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.roles}</td>
                <td>{this.props.user.department}</td>
                <td>{this.props.user.worksite}</td>
            </tr>
        );
    }
}