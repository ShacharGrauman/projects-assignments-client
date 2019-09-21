import React from "react";
// import { Projects } from "../data/Projects";
// import { EmpListProject1, EmpListProject2 } from "../data/Emp";
import { Button, Badge } from "react-bootstrap";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import SkillBadge from "./SkillBadge";
import InputErrors from "./InputError";
import  Api from './Api';


export default class AssignHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      // isLoading: true,
      projectsData: [],
      EmployeesByProjectByID: [],
      searchBar: {
        value: "",
        errors: [],
        validations: { required: true, minLength: 1 }
      }
    };
    
    this.setProjectInSession = this.setProjectInSession.bind(this);
    this.getEmpForProject = this.getEmpForProject.bind(this);
    this.getSearchDataByProjectName = this.getSearchDataByProjectName.bind(this);
    this.getSearchDataByEmployeeName = this.getSearchDataByEmployeeName.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);

  }
  async componentDidMount() {
    const projectsData = await Api.getProjects();
    this.setState({projectsData});
  }

  async getSearchDataByProjectName() {
    const projectsData = await Api.getProjectsByProjectName(this.state.searchBar.value);
    this.setState({projectsData});
  }
  async getSearchDataByEmployeeName() {
    const projectsData = await Api.getProjectsByEmployeeName(this.state.searchBar.value);
    this.setState({projectsData});
  }
  async getEmpForProject(projectID) {
    
    const EmployeesByProjectByID = await Api.getEmpForProjects(projectID);
    this.setState({EmployeesByProjectByID});

  }
  setSearchValue(event){
    this.setState({
      searchBar: {
        ...this.state.searchBar, 
        value: event.target.value
      }
    });
  }

  setProjectInSession(project) {
    sessionStorage.clear();
    sessionStorage.setItem("Project", JSON.stringify(project));
  }
  inputChange(e) {
    const { validations } = this.state[e.target.name];
    const errors = [];

    if (validations.required) {
      if (!e.target.value) {
        errors.push(`${e.target.name} is required`);
      }
    }

    if (validations.minLength) {
      if (e.target.value.length < validations.minLength) {
        errors.push(
          `${e.target.name} should be at least ${validations.minLength} characters`
        );
      }
    }

    this.setState({
      [e.target.name]: {
        ...this.state[e.target.name],
        value: e.target.value,
        errors
      }
    });
  }

  render() {
    return (
      <>
        <div className="col justify-content-md-center">
          <h1 style={{ marginLeft: "600px" }}>Projects </h1>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <input
              className="form-control mr-sm-2 w-25 "
              type="search"
              placeholder="Search"
              aria-label="Search By Project Name"
              // defaultValue={this.state.searchBar.value}
              // onBlur={e=>this.inputChange}
              onKeyUp={this.setSearchValue}
            ></input>

            <button
              className="btn btn-outline-success my-2 my-sm-0 mr-2"
              type="submit"
              onClick={this.getSearchDataByProjectName}
            >
              Search Project By Name
            </button>
            
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={this.getSearchDataByEmployeeName}
            >
              Search Employee By Name 
            </button>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-2">
            {" "}
            <InputErrors errors={this.state.searchBar.errors} />
          </div>
          <div className="accordion" id="accordionExample">
            {this.state.projectsData.map(project => {
              return (
                <div className="card" style={{overflow:"visible"}}>
                  <div className="card-header" id="headingOne">
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn btn-outline-info"
                          type="button"
                          data-toggle="collapse"
                          data-target={`#project${project.id}`}
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
                    id={`project${project.id}`}
                    className="collapse "
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body" >
                      <div className="row" >
                        <div className="col">
                          <h6 style={{ fontWeight: "bold" }}>
                            Required Technical Skills{" "}
                          </h6>
                          {project.technicalSkill.map((skill, index) => {
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
                          {project.productSkill.map((skill, index) => {
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
                        <div className="col">
                          <h6 style={{ fontWeight: "bold" }}>Date</h6>
                          {project.startDate}
                        </div>
                        <div className="col">
                          <h6 style={{ fontWeight: "bold" }}>Description</h6>
                          {project.description}
                        </div>
                      </div>
                      <div className="row" >
                        <div className="col-12" >
                          <h6 style={{ fontWeight: "bold" }}> Employess </h6>

                          <div className="input-group-prepend" >
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Employees
                            </button>
                            <div className="dropdown-menu w-20" style={{height:"150px",overflow:"scroll"}}>
                              {this.state.EmployeesByProjectByID.map(Emp => {
                                return (
                                  <>
                                    <Link
                                      to={`assign-history/${Emp.id}/${Emp.name}`}
                                      className="dropdown-item"
                                      
                                    >
                                      {Emp.name}
                                    </Link>
                                    <div role="separator" className="dropdown-divider"></div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
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
