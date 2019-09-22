import React from 'react';
import UsersTableRow from './UsersTableRow';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {api} from '../../mock-data/api';
import InputErrors from './InputErrors';
import DataProvider, { DataContext } from '../common/Provider/DataProvider';
import {dropDownData} from '../../mock-data/mock-data'
import DropDownsOptions from './DropDownsOptions';

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
            number : {value : '', errors: [], validations : {required : false, pattern : /^[a-zA-Z0-9]+$/}},
            name : {value : '', errors: [], validations : {required : false, pattern : /^[a-zA-Z]+$/}},
            rolesDropdown : '',
            departmentsDropdown : '',
            workSitesDropdown : '',
            countryDropDown : '',
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.inputChange = this.inputChange.bind(this);
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
        this.inputChange(e);
        // if(!e.target.name === undefined){
        //     fetch('/', {
        //         method: 'post',
        //         body: {
        //             "name": this.state["name"].value,
        //             "employeeNumber": this.state["employeeNumber"].value
        //         }
        //     });
        // }
    }

    inputChange(e){
        const nameErrors = [],
            numberErrors = [];
        if(e.target.name.value){
            if(this.state["name"].validations.pattern){
                if(!this.state["name"].validations.pattern.test(e.target.name.value)){
                    nameErrors.push(`${e.target.name.name} must contain only letters`);
                }
            }
        }
        if(e.target.number.value){
            if(this.state["number"].validations.pattern)
            if(!this.state["number"].validations.pattern.test(e.target.number.value)){
                numberErrors.push(`${e.target.number.name} must contain only letters and numbers`);
            }
        }

        this.setState({
            name: {
                ...this.state["name"],
                value : e.target.name.value, 
                errors : nameErrors 
            },
            number: {
                ...this.state["number"],
                value : e.target.number.value, 
                errors : numberErrors 
            }
        });  
    }

    render(){
        return(
            <div>
                <div className="col-9 m-auto">
                    <form onSubmit={this.searchHandler}>
                        <div className="form-row input-group lg-10 m-auto">
                            <input type="text" ref="id" className="form-control" 
                                    placeholder="Search by Employee Number" aria-label="Search by Emp. Number" aria-describedby="button-addon2" 
                                    name="number"
                                    />
                            <input type="text" ref="fullName" className="form-control" 
                                    placeholder="Search by Name" aria-label="Search by Name" aria-describedby="button-addon2" 
                                    name="name"
                                    />
                            <div className="input-group-append">
                                <button className="btn btn-outline-success" type="submit" id="button-addon2">Search</button>
                            </div>
                        </div>
                        <InputErrors errors={this.state["name"].errors}/>
                        <InputErrors errors={this.state["number"].errors} />
                        <div className="form-row m-auto d-flex">
                            <div className="mt-2">
                                <a style={AdvancedSearchStyle} className="justify-content-center mr-2" onClick={this.showAdvancedSearch}>Advanced Search</a>
                            </div>
                            <div  id="advancedSearchOptions" style={AdvancedSearchOptionsStyle}>
                                <DataProvider>
                                {
                                    dropDownData.map(data =>
                                    <DataContext.Consumer>
                                    {(context) =>
                                        
                                        <DropDownsOptions context={context[data.name]}
                                            name={data.name}
                                        />
                                    }
                                    </DataContext.Consumer>)
                                }
                                </DataProvider>
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