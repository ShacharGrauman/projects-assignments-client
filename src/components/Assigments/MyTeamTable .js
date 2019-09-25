import React from "react";

// import { getEmployeeForAssignments } from "./api";
import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";
import MyTeamDetailsTable from "./MyTeamDetailsTable";
import Api from "./Api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { DataContext } from "../common/Provider/DataProvider";

const SearchByNameStyle = {
  cursor: "pointer",
  color: "blue",
  textDecoration: "underline",
  position: "relative",
  left: "55%"
};
const employeeNameSearchStyle = {
  display: "none"
};

export default class MyTeamTable extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      employeesSearch: [],
      project: [],
      search: "",
      selectedLevel: "0",
      searchFlag: true
    };
    this.searchEmp = "";

    this.assign = this.assign.bind(this);
    this.filterList = this.filterList.bind(this);
    this.filterListByEmpName = this.filterListByEmpName.bind(this);
    this.showEmployeeNameSearch = this.showEmployeeNameSearch.bind(this);
  }

  async componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem("Project"));

    const employees = await Api.getMyTeam();
    this.setState({ employees, employeesSearch: employees });
    this.setState({ project: data });
  }

  async assign(
    employeeID,
    projectID,
    requestFromManagerID,
    requestToManagerID
  ) {
    try {
      const newAssign = await Api.addNewAssignment(
        employeeID,
        projectID,
        requestFromManagerID,
        requestToManagerID
      );

      if (newAssign.status === 200) {
        if (
          newAssign.data.requestFromManagerID ===
          newAssign.data.requestToManagerID
        ) {
          toast.success("Assigment success");
        }
        if (
          newAssign.data.requestFromManagerID !=
          newAssign.data.requestToManagerID
        ) {
          toast.info("Request Send To Employee Manager");
        }
      }
    } catch (error) {
      if (error.response.data.status == "BAD_REQUEST") {
        toast.error("Employee Already Assigned To This Project");
      }
    }
  }

  async filterList(e) {
    e.preventDefault();
    // const requiredSkill = this.state.search.toLowerCase();
    const requiredSkill = this.state.search;
    const requiredLevel = this.state.selectedLevel;

    if (!requiredSkill) {
      toast.info("Skill Name Required For Search");
      return;
    }
    const employeesSearch = await Api.getEmployeeBySkill(
      requiredSkill,
      requiredLevel
    );
    this.setState({
      employeesSearch
    });
  }

  async filterListByEmpName(e) {
    e.preventDefault();

    if (!this.searchEmp) {
      this.setState({
        employeesSearch: this.state.employees
      });
      return;
    }
    const employeesSearch = await Api.getSearchEmployee(this.searchEmp);
    this.setState({
      employeesSearch
    });
  }

  showEmployeeNameSearch() {
    if (this.state.searchFlag) {
      this.setState({ searchFlag: false });
    } else {
      this.setState({ searchFlag: true });
    }
  }

  render() {
    return (
      <>
        <div className="row justify-content-center">
          <div
            className="card col-8 col-md-8 col-sm-8 col-lg-8 mt3"
            style={{
              border: "1px solid black"
            }}
          >
            <h2 className="card-header text-center">
              <strong>{this.state.project.name}</strong>
            </h2>

            <div className="card-body">
              <p className="card-text text-center">
                <strong>Start Date : {this.state.project.startDate}</strong>
              </p>
              <p className="card-text">
                Description : {this.state.project.description}
              </p>

              <p>
                Technical Skills:
                {this.state.project.technicalSkill &&
                  this.state.project.technicalSkill.map((skill, index) => {
                    return (
                      <SkillBadge
                        key={index}
                        name={skill.name}
                        level={skill.level}
                        type={"Tech"}
                      />
                    );
                  })}
              </p>

              <p>
                Product Skills:
                {this.state.project.productSkill &&
                  this.state.project.productSkill.map((skill, index) => {
                    return (
                      <SkillBadge
                        key={index}
                        name={skill.name}
                        level={skill.level}
                        type={"Pro"}
                      />
                    );
                  })}{" "}
              </p>

              <Link to="/Projects" className="float-right">
                Back to projects
              </Link>
            </div>
          </div>
        </div>
        {this.state.searchFlag ? (
          <form>
            <div className="d-flex justify-content-center align-items-center  mt-3">
              <div className="">
                <h6 className="">Skill Name </h6>

                <input
                  className="col-md-11 "
                  type="text"
                  placeholder="Search By Skill Name"
                  aria-label="Search"
                  onKeyUp={e => this.setState({ search: e.target.value })}
                />
                {/* <datalist id="skill">                  
                  {[...skills.technicalSkills, ...skills.productSkills].map(skill=> <option key={skill.skillId} value={skill.skillName}/>)}
              </datalist> */}
              </div>
              <div className="">
                <h6 className="">Skill Level</h6>
                <div className="form-check-inline m-0 align-items-end">
                  <select
                    value={this.state.selectedLevel}
                    className="form-control"
                    onChange={e =>
                      this.setState({ selectedLevel: e.target.value })
                    }
                  >
                    <option value="0">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="">
                <h6 className="ml-4">Search</h6>

                <button
                  onClick={this.filterList}
                  className=" ml-4 btn btn-outline-success mx-1"
                  style={{ borderRadius: "50%" }}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
            <a
              style={SearchByNameStyle}
              className="justify-content-md-center ml-4 mt-4"
              onClick={this.showEmployeeNameSearch}
            >
              Search By Employee Name
            </a>
          </form>
        ) : (
          <form className="d-flex justify-content-center align-items-center mb-4 mt-3">
            <div id="employeeNameSearch">
              <div className="row">
                <div className="col-md-6 mr-4">
                  <h6 className="">Employee Name</h6>
                  <input
                    aria-label="skill"
                    type="text"
                    className="col-md-11"
                    placeholder="Employee Name"
                    onKeyUp={e => (this.searchEmp = e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <h6 className="">Search</h6>
                  <button
                    onClick={this.filterListByEmpName}
                    className=" btn btn-outline-success mr-5 mx-1"
                    style={{ borderRadius: "50%" }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
              <a
                style={SearchByNameStyle}
                className="justify-content-md-center ml-4 mt-4"
                onClick={this.showEmployeeNameSearch}
              >
                Search By Skills
              </a>
            </div>
          </form>
        )}

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ marginBottom: "50px" }}
        >
          <MyTeamDetailsTable
            project={this.state.project}
            employees={this.state.employeesSearch}
            onAssign={this.assign}
          />
        </div>
      </>
    );
  }
}
