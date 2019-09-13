import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import {AuditTableData} from '../../mock-data/mock-data'
import userAuditRow from './userAuditRow'


export default class Audit extends React.Component {

    constructor(){
        super();
        this.state={
            startDate: new Date(),
            endDate: new Date(),
            users: [] ////////////////// users? or actions ? 

            // rqendDate: { value: '', errors: [], validations: { required: (this.state.handleChange2.date > this.state.handleChange.date) } }
          };
    }

    componentDidMount(){
        this.setState({
            users: AuditTableData
          })
    }

    render(){
        return(
            <>
                <div className="mt-4">
                <h2 className="text-center">
                    Audit
                </h2>
                </div>



                    {/* SEARCH/FILTER INPUTS  */}

                <div className="container mb-3">
                    <div className="row align-items-end">
                        <div className="col-lg-3 col-sm-6 col-xs-12  p-0" >
                            <h6 className="mb-0">From</h6>
                            <DatePicker
                                className="form-control "
                                name="startDate"
                                dateFormat='dd/MM/yyyy'
                                // selected={this.state.startDate}
                                // onChange={this.handleChange}
                            // defaultValue={this.state.startDate.value} 
                            />
                        </div>

                        <div className="col-lg-3 col-sm-6 col-xs-12 p-0">
                            <h6 className="mb-0">To</h6>
                            <DatePicker
                                className="form-control"
                                name="rqendDate" ////////////////////// rqendDate ? 
                                dateFormat='dd/MM/yyyy'
                                // selected={this.state.endDate}
                                // onChange={this.handleChange2}
                                // onBlur={this.inputChange}
                            // defaultValue={this.state.rqendDate.value}
                            />
                        </div>
                        {/* <InputErrors errors={this.state.rqendDate.errors} />  */}
                        <div className="col-lg-3 col-sm-6 col-xs-12 p-0" >
                            <h6 className="mb-0">Emp. No</h6>
                            <input
                                style={{width:'auto'}}
                                type="text"
                                className="form-control "
                                placeholder="Search by User Id"
                                name="user"
                                onBlur={this.inputChange} />
                        </div>

                        <div className="col-lg-3 col-sm-6 col-xs-12 p-0" >
                            <h6 className="mb-0">Action</h6>
                            <div className="form-check-inline m-0 align-items-end">
                                <select className="form-control " style={{cursor : "pointer",width:'auto',minWidth:'220px'}}>
                                    <option value="all actions">All actions</option>
                                    <option value="Login">Login</option>
                                    <option value="Login Failure">Login Failure</option>
                                    <option value="Add User">Add User</option>
                                    <option value="Delete Role">Delete Role</option>
                                </select>
                                <button className=" btn btn-outline-success mx-1" style={{borderRadius:"50%"}}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </button>
                            
                            </div>
                        </div>

                    </div>
                </div>





                    {/* A component to built the table */}
                    <div className=" d-flex justify-content-center" style={{height:'auto'}}>
                        <table className="table table-sm col-lg-8 table-hover text-center" 
                        style={{cursor : "pointer"}}>
                        <thead className="thead" id="userAuditRow">
                            <tr>
                            <th scope="col">User Id</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                           {this.state.users.map(user =>{
                               return(
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.date}</td>
                                    <td>{user.time}</td>
                                    <td>{user.activity}</td>
                                </tr>  
                               )
                            }) }
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