import React from "react";
import { Link } from "react-router-dom";
import InputErrors from "./InputError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAd,
    faAtom,
    faClock,
    faUsers,
    faCalendarday
} from "@fortawesome/free-solid-svg-icons";



export default class DoneAssigments extends React.Component {

    constructor() {
        super();

        this.state = {
            fromdate: { value: "", errors: [], validations: { required: true } },
            assigments:[]
            
        };
       
    }
    componentDidMount() {
        //fetch student data from the server using the student id
        //*student id should be received from the routing system
        //After getting the data from the server:
        //update state!
        fetch('http://localhost:8080/api/doneassignments?managerID=1&requestedDate=2001-01-01&pageNumber=1&limit=10')
          .then(response => response.json())
          .then(assigments => this.setState({assigments}, () => console.log(this.state.assigments)));
           /*} id: assigmentid.id,
            projectID:assigmentid.projectID,
            startDate:assigmentid.startDate,
            endDate:assigmentid.endDate,
            requestFromManagerID:assigmentid.requestFromManagerID,
            requestToManagerID:assigmentid.requestToManagerID,
            status:assigmentid.status,
            employeeName:assigmentid.employeeName,
            projectName:assigmentid.projectName
          */
          
          
      }

      inputChange({ target: { name, value } }) {
        const { validations } = this.state[name];
        const errors = [];
    
        if (!validations) return;
    
        if (validations.required) {
          if (!value) {
            errors.push(`${name} is required`);
          }
        }
    
        if (validations.minLength) {
          if (value.length < validations.minLength) {
            errors.push(
              `${name} should be at least ${validations.minLength} characters`
            );
          }
        }
    }

    render() {
        return (

            <div className="alert alert-info col-10 " style={{ marginLeft: "100px" }} role="alert">
                <h4 className="alert-heading text-center  ">
                    Done Assigments
            </h4>

                <hr></hr>
            <div className="row">
                <div className="col-md-3 ">
                    <label htmlFor="StartDate">From Date</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                            </span>
                        </div>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="/ / "
                            aria-label="fromdate"
                            aria-describedby="basic-addon1"
                            id="dateID"
                            name="fromdate"
                            defaultValue={this.state.fromdate.value}
                            onBlur={this.inputChange}
                        ></input>
                    </div>
                    <InputErrors errors={this.state.fromdate.errors} />
                </div>
                <div className="col-md-2 col-lg-2  col-sm-2 ">
                <div>
                  <label htmlFor="skilltype">  Search</label>
                  <button
                    className="btn btn-info btn-block"
                    onClick={this.addskill}
                  >
                  Search
                  </button>
                  
                </div>
              </div>
              </div>
{/*//////////////////////////////*/}
<table
          className="table"
          style={{
            width: "100%",
            marginLeft: "0px",
            marginTop: "80px",
            border: "1px solid black",
            textAlign: "center"
          }}
        >
          <thead className="thead-dark ">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Project Name</th>
              <th scope="col">Project ID</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Requested From ManagerID</th>
              <th scope="col">Requested TO ManagerID</th>
              <th scope="col">Status</th>
              <th scope="col">Assign</th>
              
            </tr>
          </thead>
          <tbody>
            
          {this.state.assigments.map((Assign, i) => {
              return (
                <tr key={i}>
                  
                  <td>{Assign.id}</td>
                  <td>{Assign.projectName}</td>
                  <td>{Assign.projectID}</td>
                  <td>{Assign.employeeName}</td>
                  <td>{Assign.employeeID}</td>
                  <td>{Assign.startDate}</td>
                  <td>{Assign.endDate}</td>
                  <td>{Assign.requestFromManagerID}</td>
                  <td>{Assign.requestToManagerID}</td>
                  <td>{Assign.status}</td>
                  <td> <button type="submit" className="btn btn-primary btn-block" >Assign</button></td>
                </tr>
                
            );
        })}
                
          </tbody>
        </table>
{/*//////////////////////////////*/}


            </div>
        )
    }
}