import React from "react";
import InputErrors from "./InputError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Api from "./Api";
import { toast } from "react-toastify";
export default class DoneAssigments extends React.Component {
  constructor() {
    super();

    this.state = {
      fromdate: {
        value: "2001-01-01",
        errors: [],
        validations: { required: true }
      },
      assigments: []
    };
    this.search = this.search.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }
  async componentDidMount() {
    const assigments = await Api.getDoneAssignByDate(this.state.fromdate.value);
    this.setState({ assigments });
  }

  async search() {
    if (!this.state.fromdate.value) return;
    try {
      const assigments = await Api.getDoneAssignByDate(
        this.state.fromdate.value
      );
      if(assigments.length!=0){
        this.setState({ assigments });
        toast.success(`Found ${assigments.length} Recoreds `)
      }
      else{
          toast.error("There is No Done Assigment For Requested Date")
      }
      
    } catch (error) {}
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
      <div
        className="alert alert-info col-10 "
        style={{ marginLeft: "100px" }}
        role="alert"
      >
        <h4 className="alert-heading text-center  ">Done Assigments</h4>

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
              <label htmlFor="skilltype"> Search</label>
              <button className="btn btn-info btn-block" onClick={this.search}>
                Search
              </button>
            </div>
          </div>
        </div>
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
              <th scope="col">Project Name</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
              <th scope="col">Requested From ManagerID</th>
              <th scope="col">Requested TO ManagerID</th>
            </tr>
          </thead>
          <tbody>
            {this.state.assigments.map((assign, i) => {
              return (
                <tr key={i}>
                  <td>{assign.projectName}</td>
                  <td>{assign.employeeName}</td>
                  <td>{assign.startDate}</td>
                  <td>{assign.endDate}</td>
                  <td>{assign.fromManagerName}</td>
                  <td>{assign.toManagerName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
