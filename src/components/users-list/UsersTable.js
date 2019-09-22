import React from 'react';
import UsersTableRow from './UsersTableRow';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {api} from '../../mock-data/api';

const AdvancedSearchStyle = {
    cursor : "pointer",
    color : "blue",
    textDecoration : "underline"

}
const AdvancedSearchOptionsStyle = {
    display : "none"
}

export default class UsersTable extends React.Component{
    constructor(){
        super();
        this.state ={
            users : [],
            id : {value : 0, validations : {required : true, pattern : /^\d+$/}},
            employeeNumber : {value : '', validations : {required : true, minLength : 1, pattern : /^\d+$/}},
            firstName : {value : '', validations : {required : true, minLength : 2, pattern : /\d/gi}},
            lastName : {value : '', validations : {required : true, minLength : 2, pattern : /\d/gi}},
            roles : {value : '', validations : {required : true, minLength : 2}},
            department : {value : '', validations : {required : true, minLength : 2}},
            workSite : {value : '', validations : {required : true, minLength : 2, pattern : /\d/gi}},
            status : {value : '', validations : {required : true, minLength : 2}},
            errors: []
        }
        this.searchHandler = this.searchHandler.bind(this)   
    }

    async componentDidMount(){
        const users = await api.getUsersList();
        this.setState({users});
    }

    showAdvancedSearch(){ 
        const advancedSearchOptions = document.querySelector('#advancedSearchOptions');

        if(advancedSearchOptions.style.display == "flex"){
            advancedSearchOptions.style.display = "none";
            
        }
        else{
            advancedSearchOptions.style.display = "flex";
        }   
    }

    searchHandler(e){
        e.preventDefault();
        console.log(e);
        // fetch('/', {
        //     method: 'post',
        //     body: {
        //         "first_name": this.refs.fullName.value
        //     }
        // });
    }

    render(){
        return(
            <div>
                <div className="col-9 m-auto">
                    <form onSubmit={this.searchHandler}>
                        <div className="form-row input-group lg-10 m-auto">
                            <input type="text" ref="id" className="form-control" 
                                    placeholder="Search by ID" aria-label="Search by Emp. Number" aria-describedby="button-addon2" 
                                    id="userID"
                                    />
                            <input type="text" ref="fullName" className="form-control" 
                                    placeholder="Search by Name" aria-label="Search by Name" aria-describedby="button-addon2" 
                                    id="userName"
                                    />
                            <div className="input-group-append">
                                <button className="btn btn-outline-success" type="submit" id="button-addon2">Search</button>
                            </div>
                        </div>
                        <div className="form-row m-auto d-flex">
                            <div className="mt-2">
                                <a style={AdvancedSearchStyle} className="justify-content-md-center mr-2" onClick={this.showAdvancedSearch}>Advanced Search</a>
                            </div>
                            <div  id="advancedSearchOptions" style={AdvancedSearchOptionsStyle}>
                                <div className="dropdown mr-1 mt-2">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                                        Role
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                                        <a className="dropdown-item" href="#">Manager</a>
                                        <a className="dropdown-item" href="#">Employee</a>
                                        <a className="dropdown-item" href="#">Admin</a>
                                    </div>
                                </div>
                                <div className="dropdown mr-1 mt-2">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                                        Department
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                                        <a className="dropdown-item" href="#">Manager</a>
                                        <a className="dropdown-item" href="#">Employee</a>
                                        <a className="dropdown-item" href="#">Admin</a>
                                    </div>
                                </div>
                                <div className="dropdown mr-1 mt-2">
                                        <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                                            Work Site
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                                        <a className="dropdown-item" href="#">Manager</a>
                                        <a className="dropdown-item" href="#">Employee</a>
                                        <a className="dropdown-item" href="#">Admin</a>
                                        </div>
                                </div>
                                <div className="dropdown mr-1 mt-2">
                                        <button type="button" className="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
                                            Country
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                                        <a className="dropdown-item" href="#">Manager</a>
                                        <a className="dropdown-item" href="#">Employee</a>
                                        <a className="dropdown-item" href="#">Admin</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Users table */}
                <div className="row">
                    <Link to="user-profile/addUser" className="btn btn-success">Add User</Link>
                    <table className="table table-sm table-hover mt-2" style={{cursor : "pointer"}} id="usersTable">
                        <thead className="thead-dark">
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Roles</th>
                                <th>Department</th>
                                <th>Work Site</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* A Component for dynamically filling the table*/}
                            {
                                this.props.users.map(user =>  
                                    <UsersTableRow 
                                        key={user["employee"].id}
                                        user={user["employee"]}
                                        roles={user["roles"]}
                                    />
                                )
                            }  
                        </tbody>
                    </table>
                </div>
            
                <nav aria-label="..." className="d-flex justify-content-center">
                    <ul className="pagination">
                        <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active" aria-current="page">
                        <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

// ReactDom.render(<UsersTable/>,
//     document.querySelector('#container')
//     );