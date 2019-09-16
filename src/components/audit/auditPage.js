import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { AuditTableData } from '../../mock-data/mock-data'


const AdvancedSearchStyle = {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline"

}
const AdvancedSearchOptionsStyle = {
    display: "none"
}

export default class Audit extends React.Component {

    constructor() {
        super();
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            users: [] ////////////////// users? or actions ? 

        };
        this.handleChange = date => {
            this.setState({
                startDate: date,

            });
        };

        this.handleChange2 = date => {
            this.setState({
                endDate: date,

            });
        };
    }
    onChange() { (date) => this.setState({ date }) }

    componentDidMount() {
        this.setState({
            users: AuditTableData
        });

        fetch('http://localhost:8080/api/audit')
        .then(response => response.json())
        .then(audits => this.setState({users: audits.map(audit => ({
            employeeNumber: audit.employeeNumber,
            firstName: `${audit.firstName}`,
            lastName: `${audit.lastName}`,
            date: audit.dateTime,
            time: audit.dateTime,
            activity: audit.activity
            }))
        }));
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
                    <h2 className="text-center">
                        Audit
                </h2>
                </div>

            {/* SEARCH/FILTER INPUTS  */}

                <div className="col-8 m-auto mt-5">
                    <form>
                        <div className="form-row m-auto d-flex align-items-center">
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
                                            name="user"
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
                                            <button className=" btn btn-outline-success mx-1" style={{ borderRadius: "50%" }}>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* A component to built the table */}
                <div className=" d-flex justify-content-center mt-3" style={{ height: 'auto' }}>
                    <table className="table table-sm col-lg-8 table-hover text-center"
                        style={{ cursor: "pointer" }}>
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
                            {this.state.users.map(user => {
                                return (
                                    <tr key={user.employeeNumber}>
                                        <td>{user.employeeNumber}</td>
                                        <td>{user.firstName + ' ' + user.lastName}</td>
                                        <td>{user.date}</td>
                                        <td>{user.time}</td>
                                        <td>{user.activity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="d-flex justify-content-center mt-4 col-md-12">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">4</a></li>
                            <li className="page-item"><a className="page-link" href="#">5</a></li>
                            <li className="page-item"><a className="page-link" href="#">6</a></li>
                            <li className="page-item"><a className="page-link" href="#">7</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>



            </>
        );
    }

}