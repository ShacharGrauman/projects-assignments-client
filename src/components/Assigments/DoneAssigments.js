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
            fromdate: { value: "2001-01-01", errors: [], validations: { required: true } },
            assigments: []
        };
        this.search = this.search.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    componentDidMount() {

        fetch(`http://localhost:8080/api/assignments/status/1?managerID=1&requestedDate=${this.state.fromdate.value}&pageNumber=1&limit=10`)
            .then(response => response.json())
            .then(assigments => this.setState({ assigments }, () => console.log(this.state.assigments)));


    }

    search() {

        if(!this.state.fromdate.value) return;

        try {
            fetch(`http://localhost:8080/api/assignments/status/1?managerID=1&requestedDate=${this.state.fromdate.value}&pageNumber=1&limit=10`)
                .then(response => response.json())
                .then(assigments => this.setState({ assigments }, () => console.log(this.state.assigments)))
                .catch(err => alert(err));
        } catch (error) {
            // this.setState({assigments:[]});
            console.log(error.message)
        }



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


        this.setState({ fromdate: { ...this.state.fromdate, value } });

    }

    render() {
        return (

            <div className="alert alert-info col-10 " style={{ marginLeft: "100px" }} role="alert">
                <h4 className="alert-heading text-center  ">
                    Done Assigments
            </h4>

                <hr></hr>
                <div className="row">
                    <div className="col-md-4 ">
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
                                aria-label="fromdate"
                                name="fromdate"
                                defaultValue="2001-01-01"
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
                                onClick={this.search}
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
                            

                        </tr>
                    </thead>
                    <tbody>

                        {this.state.assigments.map((Assign, i) => {
                            console.log('here')
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
                                    
                                </tr>

                            );
                        })}

                    </tbody>
                </table>
                {/*//////////////////////////////*/}
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


            </div>
        )
    }
}
