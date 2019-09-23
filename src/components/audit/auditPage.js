import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import PaginationHOC from '../shared-components/PaginationHOC'


import {api} from '../../mock-data/api'


const AdvancedSearchStyle = {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline"

}
const AdvancedSearchOptionsStyle = {
    display: "none"
}

class Audit extends React.Component {

    constructor() {
        super();
        this.state = {
            startDate: new Date('1-1-1970'),
            endDate: new Date(),
            actions: [],
            employeeNumber:{value:'', errors:[], validations:{}}
        };

        this.searchAudit = this.searchAudit.bind(this)
        this.inputChange = this.inputChange.bind(this)

        this.handleChange = date => { /////////////////?!?!
            this.setState({
                startDate: date,
            });
        };

        this.handleChange2 = date => {/////////////////////////?!?!?!
            this.setState({
                endDate: date,
            });
        };
    }
    onChange() { (date) => this.setState({ date }) }

    async componentDidMount() {

           
        // this.props.paginationConfig({
        //     url:'http://localhost:8080/api/audit/',
        //     rowsPerPage:10,
        //     rowsPerPage:50,
        // })  

        // this.props.paginationConfig({
        //     url:'',
        //     rowsPerPage:50,
        // })

        api.getUserAuditByNumber();

        const actions = await api.getUserAuditByNumber();
        this.setState({actions})
    }


    inputChange ({ target: { name, value } }){
        this.setState({
            [name]: {
                ...this.state[name],
                value: value,
                // errors
            }
        });
    }

    async searchAudit(e){
        e.preventDefault()

       
            const actions = await api.auditSearchByEmployeeNumber(this.state.employeeNumber.value);
            this.setState({actions})
    }
        
    

    showAdvancedSearch() {
        const advancedSearchOptions = document.querySelector('#advancedSearchOptions');

        if (advancedSearchOptions.style.display == "flex") {
            advancedSearchOptions.style.display = "none";

        }
        else {
            advancedSearchOptions.style.display = "flex";
        }
    }
    
    render() {
        return (
            <>
                <div className="mt-4">
                    <h2 className="text-center">Audit</h2>
                </div>

            {/* SEARCH/FILTER INPUTS  */}

                <div className=" m-auto mt-5 col-10">
                    <form>
                        <div className="form-row m-auto d-flex align-items-center" >
                            <div >
                                <a style={AdvancedSearchStyle} className="justify-content-md-center mr-2" onClick={this.showAdvancedSearch}>Search</a>
                            </div>
                            <div id="advancedSearchOptions" style={AdvancedSearchOptionsStyle}>
                                <div className="row align-items-end ml-3">
                                    <div className="col-lg-3 col-sm-6 col-xs-12  p-0" >
                                        <h6 className="mb-0">From:</h6>
                                        <DatePicker
                                            className="form-control "
                                            name="startDate"
                                            dateFormat='dd/MM/yyyy'
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        // defaultValue={this.state.startDate.value} 
                                        />
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-xs-12 p-0">
                                        <h6 className="mb-0">To:</h6>
                                        <DatePicker
                                            className="form-control"
                                            name="endDate"  
                                            dateFormat='dd/MM/yyyy'
                                            selected={this.state.endDate}
                                            onChange={this.handleChange2}
                                        // defaultValue={this.state.endDate.value}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-xs-12 p-0" >
                                        <h6 className="mb-0">Emp. No:</h6>
                                        <input
                                            style={{ width: 'auto' }}
                                            type="text"
                                            className="form-control "
                                            placeholder="Search by Employee No."
                                            defaultValue={this.state.employeeNumber.value}
                                            name="employeeNumber"
                                            onBlur={this.inputChange} />
                                    </div>

                                    <div className="col-lg-3 col-sm-6 col-xs-12 p-0" >
                                        <h6 className="mb-0">Activity:</h6>
                                        <div className="form-check-inline m-0 align-items-end">
                                            <select className="form-control " style={{ cursor: "pointer", width: 'auto', minWidth: '220px' }}>
                                                <option value="all actions">All Activities</option>
                                                <option value="Login">Login</option>
                                                <option value="Login Failure">Login Failure</option>
                                                <option value="Add User">Add User</option>
                                                <option value="Delete Role">Delete Role</option>
                                            </select>
                                            <button onClick={this.searchAudit} className=" btn btn-outline-success mx-1" style={{ borderRadius: "50%" }}>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* A component to build the table */}
                <div className=" d-flex justify-content-center mt-3" style={{ height: 'auto' }}>
                    <table className="table table-sm col-lg-8 table-hover text-center">
                        <thead className="thead" id="userAuditRow">
                            <tr>
                                <th scope="col">Employee No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.actions.map((action,i) => {
                                return (
                                    <tr key={i}>
                                        <td>{action.audit.employeeNumber}</td>
                                        <td>{action.firstname + ' ' + action.lastname}</td>
                                        <td>{action.audit.dateTime}</td>
                                        <td>{action.time}</td>
                                        <td>{action.audit.activity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

              

            </>
        );
    }

}




export default Audit