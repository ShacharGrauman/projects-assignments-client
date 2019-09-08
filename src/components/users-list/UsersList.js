import React from 'react';
import {USERS} from '../../mock-data/Users.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class UsersList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            usersList:[]
        }

    }

    componentDidMount(){
        this.setState({
            usersList:USERS
        })
    }

    

    render(){
        return<>
          <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {this.state.usersList.map((user,i)=>{
                return (
                <tr key={i}>
                    <th scope="row">{user.id}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td><button 
                            className="btn btn-info">
                            <Link to={`user-profile/${user.id}`} style={{color:'white'}}>Details</Link>
                        </button>
                    </td>
                </tr>
                );
            })}
            </tbody>
            </table>
        </>

        
    }
}