import React from 'react';
import UsersTableRow from './UsersTableRow';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {api} from '../../mock-data/api';
import InputErrors from './InputErrors';
import DataProvider, { DataContext } from '../common/Provider/DataProvider';
import {dropDownData} from '../../mock-data/Data'
import DropDownsOptions from './DropDownsOptions';
import axios from 'axios';
import PaginationHOC from '../shared-components/PaginationHOC'



const AdvancedSearchStyle = {
    cursor : "pointer",
    color : "blue",
    textDecoration : "underline"

}
const AdvancedSearchOptionsStyle = {
    display : "none"
}

class UsersTable extends React.Component{
    constructor(){
        super();
        this.state ={
            number : {value : '', errors: [], validations : {pattern : /^[a-zA-Z0-9]+$/}},
            name : {value : '', errors: [], validations : {pattern : /^[a-zA-Z ]+$/}},
            roles : {value : '', errors: [], validations : ''},
            departments : {value : '', errors: [], validations :''},
            worksites : {value : '', errors: [], validations :''},
            countries : {value : '', errors: [], validations :''},
        }
        this.searchHandler = this.searchHandler.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount(){
        this.props.paginationConfig({
            url:'http://localhost:8080/api/employee/'
        })  
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
        if(name === "name"){
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
                                    <DataContext.Consumer>
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
                                this.props.dataValues.map(user =>  
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
            
            
            </div>
        );
    }
}


export default PaginationHOC(UsersTable)