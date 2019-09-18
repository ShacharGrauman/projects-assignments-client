import React from "react";

// import { getEmployeeForAssignments } from "./api";
import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";

export default class MyTeamTable extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      project: [],
      search: "" ///line added
    };

    this.assign = this.assign.bind(this);
    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    //Ya'ani call to the server for data
    //should be manager ID form Login
    fetch(`http://localhost:8080/api/myteam?managerID=1&pageNumber=1&limit=10`)
      .then(response => response.json())
      .then(Employees => {
        this.setState({
          employees: Employees
        });
      });
    this.setState({ project: JSON.parse(sessionStorage.getItem("Project")) });
  }

  assign(empId) {
    console.log(empId);
  }

  filterList(event) {
    var userSkills = {};
    this.state.employees.map((employee, index) => {
      let technicalSkills = employee.technicalSkills;
      technicalSkills &&
        technicalSkills.map(skill => {
          let userrSkillName = skill.skillName;
          if (
            userrSkillName.toLowerCase() == event.target.value.toLowerCase()
          ) {
            userSkills[index] = userrSkillName;
          }
        });
    });
    console.log(userSkills);
  }

  render() {
    return (
      <>
        <div className="row" style={{ width: "300x" }}>
          <div className="col-md-6">
            <div
              className="card"
              style={{
                width: "1060px",
                marginLeft: "200px",
                marginTop: "20px",
                border: "1px solid black"
              }}
            >
              <h2 className="card-header">
                <center>Project information</center>{" "}
              </h2>
              <div className="card-body">
                <h4 className="card-title">
                  Project Name : {this.state.project.name}
                </h4>
                <p className="card-text">
                  Project ID : {this.state.project.id}
                </p>
                <p className="card-text">
                  Start Date : {this.state.project.startDate}
                </p>
                <p className="card-text">
                  Description : {this.state.project.description}
                </p>

                <p> </p>
               
                {/* <div>
                  <div className="col">
                    <h6 style={{ fontWeight: "bold" }}>
                      Required Technical Skills{" "}
                    </h6>
                    {this.state.project.technicalSkill.map((skill, index) => {
                      return (
                        <SkillBadge
                          key={index}
                          name={skill.name}
                          level={skill.level}
                          type={"Tech"}
                        />
                      );
                    })}
                  </div>
                  <div className="col">
                    <h6 style={{ fontWeight: "bold" }}>
                      Required Product Skills{" "}
                    </h6>
                    {this.state.project.productSkill.map((skill, index) => {
                      return (
                        <SkillBadge
                          key={index}
                          name={skill.name}
                          level={skill.level}
                          type={"Prod"}
                        />
                      );
                    })}
                  </div>
                </div> */}
                <Link to="/Projects" className="btn btn-outline-info">
                  Back to projects
                </Link>
              </div>
            </div>
          </div>

          <div className="col md-3"></div>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
          {/* <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Choose skill type
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Technical Skills
              </a>
              <div role="separator" className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Product Skills
              </a>
            </div>
          </div> */}

          <input
            className="form-control mr-sm-2 w-25 "
            type="search"
            placeholder="Search by Employee Name"
            aria-label="Search"
            onChange={this.filterList}
          />

          <button
            className="btn btn-outline-success my-2 my-sm-0 mr-2"
            type="submit"
          >
            Search 
          </button>

          <button
            className="btn btn-outline-info"
            type="button"
            data-toggle="collapse"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Advanced search...
          </button>
        </div>
        <table
          className="table"
          style={{
            width: "70%",
            marginLeft: "200px",
            marginTop: "20px",
            border: "1px solid black",
            textAlign: "center"
          }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Technical Skills</th>
              <th scope="col">Product Skills</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => {
              return (
                <tr key={employee.id}>
                  <td>
                    {/* <img src={employee.img} style={{ width: "50px" }}></img> */}
                    <a href="#">{employee.name}</a>
                  </td>
                  <td>{employee.id}</td>
                  <td>
                    {employee.technicalSkills.map((skill, index) => {
                      return (
                        <SkillBadge
                          key={index}
                          name={skill.name}
                          level={skill.level}
                          type={"Tech"}
                        />
                      );
                    })}
                  </td>
                  <td>
                    {employee.productSkills.map((skill, index) => {
                      return (
                        <SkillBadge
                          key={index}
                          name={skill.name}
                          level={skill.level}
                          type={"Prod"}
                        />
                      );
                    })}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target={"#assignModal" + employee.id}
                    >
                      Assign
                    </button>

                    <div
                      className="modal fade"
                      id={"assignModal" + employee.id}
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby={"#assignModal" + employee.id}
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id={"assignModal" + employee.id + "Label"}
                            >
                              Successfully Assigned
                            </h5>

                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            Employee <b>{employee.name} </b> Added To Project{" "}
                            <b>{this.state.project.name}</b>
                          </div>{" "}
                          <div class="modal-footer mb-3 justify-content-center ">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary ml-3"
                              data-dismiss="modal"
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
