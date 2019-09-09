import React from 'react';
import UsersTableRow from './UsersTableRow'
import {USERS} from '../../mock-data/Users'

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
    }

    componentDidMount(){
        
        const errors = [];
        this.setState({
            users : USERS
        });
        // this.state.users.map(user => {
        //     this.setState({
        //         id: users[user].id,
        //         employeeNumber: users[user].employeeNumber,
        //         firstName: users[user].firstName,
        //         lastName: users[user].lastName,
        //         roles: users[user].roles,
        //         department: users[user].department,
        //         workSite: users[user].workSite,
        //         status: users[user].status
        //     })
        //     if(id.validations.required){
        //         if(!id.validations.pattern.test(id.value)){
        //             errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                         ...this.state,
        //                         errors
        //             })
        //         }
        //     }
        //     if(firstName.validations.required){
        //         if(firstName.validations.pattern.test(firstName.value)){
        //             errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //         if(firstName.validations.minLength > (firstName.value.length-1)){
        //             errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //     }
        //     if(lastName.validations.required){
        //         if(lastName.validations.pattern.test(lastName.value)){
        //             errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //         if(lastName.validations.minLength > (lastName.value.length-1)){
        //             this.state.errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //     }
        //     if(roles.validations.required){
        //         if(roles.validations.minLength > (roles.value.length -1)){
        //             state.errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //     }
        //     if(department.validations.required){
        //         if(department.validations.minLength > (department.value.length -1)){
        //             errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //     }
        //     if(employeeNumber.validations.required){
        //         if(!employeeNumber.validations.pattern.test(employeeNumber.value)){
        //             errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //         if(employeeNumber.validations.minLength > (employeeNumber.value.length -1)){
        //             errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //     }
        //     if(workSite.validations.required){
        //         if(workSite.validations.pattern.test(id.value)){
        //             errors.push('There is an ERROR in the data you are requesting to display');
        //             this.setState({
        //                 ...this.state,
        //                 errors
        //             })
        //         }
        //     }
        // });
    }

    searchValidation(){
        
    }
    

    showOptions(){
        const advancedSearchOptions = document.querySelector('#advancedSearchOptions');

        if(advancedSearchOptions.style.display == "flex"){
            advancedSearchOptions.style.display = "none";
            
        }
        else{
            advancedSearchOptions.style.display = "flex";
        }   
    }

    render(){
        return(
            <div>
                <div className="col-8 m-auto justify-content-md-center">
                    <form>
                        <div className="form-row input-group lg-10 m-auto">
                            <input type="text" className="form-control" placeholder="Search by name" onBlur={this.searchValidation} aria-label="Search by name" aria-describedby="button-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-success" type="button" id="button-addon2">Search</button>
                            </div>
                        </div>
                        <div className="form-row m-auto d-flex align-items-center">
                            <div >
                                <a style={AdvancedSearchStyle} className="justify-content-md-center mr-2" onClick={this.showOptions}>Advanced Search</a>
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
                
                <div className="row">
                    <table className="table mt-2" id="usersTable">
                        <thead className="thead-dark">
                            <tr>
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
                                this.state.users.map(user => <UsersTableRow 
                                                    key={user.id}
                                                    user={user}
                                                    errors= {this.state.errors}
                                                    />)
                            }  
                        </tbody>
                    </table>
                </div>
            
            </div>
        );
    }
}

// ReactDom.render(<UsersTable/>,
//     document.querySelector('#container')
//     );