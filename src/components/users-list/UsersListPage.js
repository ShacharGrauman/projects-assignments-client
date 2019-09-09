import React from 'react';
import ReactDom from 'react-dom';
import UsersTable from './UsersTable'
import UsersStatus from './UsersStatus';
import UsersDetailsGraphs from './UsersDetailsGraphs';

export default class UsersListPage extends React.Component{
    constructor(){
        super();
    }


    render(){
        return (
            <div className="m-5">
                <div className=" row justify-content-center">
                    <h1 className="alert alert-light" role="alert">
                        Users
                    </h1>
                </div>

                <UsersStatus />
                <div className="row d-flex align-items-center">
                    <div className="col-lg-8">
                        <UsersTable />
                    </div>
                    <div className="col-lg-4">
                        <UsersDetailsGraphs />
                    </div>
                </div>
            </div>
           
        );
    }
}

