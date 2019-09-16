import React from 'react';
import ReactDom from 'react-dom';
import UsersTable from './UsersTable'
import UsersStatus from './UsersStatus';
import UsersDetailsGraphs from './UsersDetailsGraphs';
import {api} from '../../mock-data/api';

export default class UsersListPage extends React.Component{
    constructor(){
        super();
        this.state ={
            users : [],
            rolesCount : 0,
            departmentsCount : 0,
            WorkSitesCount : 0,
            usersCount :0
        }
    }

    componentDidMount(){

        api.getUsersList().then(users=>{
            this.setState({users});
        }).catch(err=>alert(err))

    }


    render(){
        return (
            <div className="m-5">
                <div className="row justify-content-center">
                    <h1 className="alert alert-light" role="alert">
                        Users
                    </h1>
                </div>

                <UsersStatus />
                <div className="row d-flex">
                    <div className="col-lg-8">
                        <UsersTable users={this.state.users}/>
                    </div>
                    <div className="col-lg-4">
                        <UsersDetailsGraphs />
                    </div>
                </div>
            </div>
           
        );
    }
}

