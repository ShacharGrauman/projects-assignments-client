import React from "react";
// import { Projects } from "../data/Projects";
// import { EmpListProject1, EmpListProject2 } from "../data/Emp";
import { Button, Badge } from "react-bootstrap";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

export default class AssignHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      // isLoading: true,
      projectsData: [],
      projectByID: []
    };
    this.setProjectInSession = this.setProjectInSession.bind(this);
    this.getEmpForProject = this.getEmpForProject.bind(this);
  }
  componentDidMount() {
    //Ya'ani call to the server for data
    // const employees = getEmployeeForAssignments();
    // this.state.projectsData = Projects;
    //this.state.projectByID = [EmpListProject1, EmpListProject2];
    setTimeout(() => {
      this.setState({
        // isLoading: false
      });
    }, 100);

    fetch("http://localhost:8080/api/projects/2")
      .then(response => response.json())
      .then(Employess => {
        this.setState({
          projectsData: Employess
        });
      });
  }
  getEmpForProject(ProjectID) {
    fetch(
      `http://localhost:8080/api/myteam/getbyprojectid?projectid=${ProjectID}`
    )
      .then(response => response.json())
      .then(Employees => {
        this.setState({
          projectByID: Employees
        });
      });
  }
  setProjectInSession(project) {
    sessionStorage.clear();
    sessionStorage.setItem("Project", JSON.stringify(project));
  }

  render() {
    return (
      <>
        <div className="col justify-content-md-center">
          <h1 style={{ marginLeft: "600px" }}>Projects Tables</h1>
          <div className="d-flex justify-content-end align-items-center mb-2">
            <input
              className="form-control mr-sm-2 w-25 "
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </div>
          <div className="accordion" id="accordionExample">
            {this.state.projectsData.map(project => {
              return (
                <div className="card">
                  <div className="card-header" id="headingOne0">
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-outline-info"
                          type="button"
                          data-toggle="collapse"
                          data-target={`#${project.id}`}
                          aria-expanded="true"
                          aria-controls="collapseOne"
                          onClick={e => this.getEmpForProject(project.id)}
                        >
                          Info
                        </button>
                      </div>
                      <div className="col">
                        <h3> {project.name}</h3>
                      </div>
                      <div className="col">
                        {" "}
                        <h3>ID: {project.id}</h3>
                      </div>
                      <div className="col">
                        {" "}
                        <Link
                          to={"./my-team"}
                          className="btn btn-outline-success"
                          onClick={e => this.setProjectInSession(project)}
                        >
                          Assign
                        </Link>
                      </div>
                    </div>

                    {/* ends card-header div */}
                  </div>
                  <div
                    id={project.id}
                    className="collapse "
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h6 style={{ fontWeight: "bold" }}>
                            Required Technical Skills{" "}
                          </h6>
                          {project.technicalSkill.map((skill, index) => {
                            return (
                              <span
                                className="badge badge-info mr-1"
                                key={index}
                              >
                                {skill.name}{" "}
                                <span
                                  className="badge badge-light"
                                  style={{
                                    fontSize: skill.level > 3 ? "1em" : ""
                                  }}
                                >
                                  {skill.level}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                        <div className="col">
                          <h6 style={{ fontWeight: "bold" }}>
                            Required Product Skills{" "}
                          </h6>
                          {project.productSkill.map((skill, index) => {
                            return (
                              <span
                                className="badge badge-secondary mr-1"
                                key={index}
                              >
                                {skill.name}{" "}
                                <span
                                  className="badge badge-light"
                                  style={{
                                    fontSize: skill.level > 3 ? "1em" : ""
                                  }}
                                >
                                  {skill.level}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                        <div className="col">
                          <h6 style={{ fontWeight: "bold" }}>Date</h6>
                          {project.startDate}
                        </div>
                        <div className="col">
                          <h6 style={{ fontWeight: "bold" }}>Description</h6>
                          {project.description}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <h6 style={{ fontWeight: "bold" }}> Employess </h6>
                          {this.state.projectByID.map(Emp => {
                            return (
                              <>
                                <Link
                                  to={`Assign-History/${Emp.id}`}
                                  className="btn btn-outline-secondary"
                                  style={{ marginLeft: "5px" }}
                                >
                                  {Emp.name}
                                </Link>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <footer
          aria-label="Page navigation example"
          style={{ marginTop: "50px" }}
        >
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <span className="page-link">
                1<span className="sr-only">(current)</span>
              </span>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </footer>
        <div style={{ height: "90px" }}></div>
      </>
    );
  }
}
