import React from 'react';
import UsersTableRow from './UsersTableRow';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {api} from '../../mock-data/api';
import InputErrors from './InputErrors';
import DataProvider, { DataContext } from '../common/Provider/DataProvider';
import {dropDownData} from '../../mock-data/Data'
import DropDownsOptions from './DropDownsOptions';
import axios from 'axios';

import Pagination from './Pagination'

const AdvancedSearchStyle = {
    cursor : "pointer",
    color : "blue",
    textDecoration : "underline"

}
const AdvancedSearchOptionsStyle = {
    display : "none"
}

export default class UsersTable extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            users : [],
            number : {value : '', errors: [], validations : {required : false, pattern : /^[a-zA-Z0-9]+$/}},
            name : {value : '', errors: [], validations : {required : false, pattern : /^[a-zA-Z ]+$/}},
            rolesDropdown : '',
            departmentsDropdown : '',
            workSitesDropdown : '',
            countryDropDown : '',
            // number : {value : '', errors: [], validations : {pattern : /^[a-zA-Z0-9]+$/}},
            // name : {value : '', errors: [], validations : {pattern : /^[a-zA-Z ]+$/}},
            // roles : {value : '', errors: [], validations : ''},
            // departments : {value : '', errors: [], validations :''},
            // worksites : {value : '', errors: [], validations :''},
            // countries : {value : '', errors: [], validations :''},
            rowsPerPage : this.props.rowsPerPage,
            page : 1,
            url: 'http://localhost:8080/api/employee',
            currentTab : 1,
            
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.changeUserList = this.changeUserList.bind(this);
    }

    async componentDidMount(){
        
        const users = await api.getData(`${this.state.url}?page=${this.state.page}&limit=${this.state.rowsPerPage}`);
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

    async searchHandler(e){
        e.preventDefault();

        console.log(this.state);

        const result= axios.post("url",{

        }).then(res => res);

    }

    async inputChange({ target: {name, value}}){
        const {validations} = this.state[name], 
            Errors = [];
        if(name === "name" && value){
            if(validations.pattern){
                if(!validations.pattern.test(value)){
                    Errors.push(`${name} must contain only letters`);
                }
            }
        }
        if(name === "number" && value){
            if(validations.pattern)
                if(!validations.pattern.test(value)){
                    Errors.push(`${name} must contain only letters and numbers`);
                }
        }

        await this.setState({
            [name]: {
                ...this.state[name],
                value : value, 
                errors : Errors 
            }
        });  
    }

    changeUserList(result){
        this.setState({
            users : result
        })
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
                                    onChange={this.inputChange}
                                    />
                            <input type="text" ref="fullName" className="form-control" 
                                    placeholder="Search by Name" aria-label="Search by Name" aria-describedby="button-addon2" 
                                    name="name"
                                    onChange={this.inputChange}
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
                                    <DataContext.Consumer key={data.name}>
                                    {(context) =>
                                        
                                        <DropDownsOptions items={context[data.name]}
                                            name={data.name} onSelect={this.inputChange}
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
                                this.state.users.map(user =>  
                                    <UsersTableRow 
                                        key={user["employee"].id}
                                        user={user["employee"]}
                                        roles={user["roles"]}
                                    />
                                )
                            }  
                        </tbody>
                    </table>
                    <div className="row col justify-content-center">
                        <Pagination usersCount={this.props.userCount}
                                rowsPerPage={this.state.rowsPerPage}
                                currentTab={this.state.currentTab}
                                url={this.state.url}
                                changeUserList={this.changeUserList}
                                />
                    </div>
                </div>
            
            
            </div>
        );
    }
}


// export default PaginationHOC(UsersTable)

// ReactDom.render(<UsersTable/>,
//     document.querySelector('#container')
//     );
