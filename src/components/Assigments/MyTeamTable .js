import React from "react";

// import { getEmployeeForAssignments } from "./api";
import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";
import MyTeamDetailsTable from "./MyTeamDetailsTable";
import Api from "./Api";
const AdvancedSearchStyle = {
  cursor: "pointer",
  color: "blue",
  textDecoration: "underline"
};
const AdvancedSearchOptionsStyle = {
  display: "none"
};

export default class MyTeamTable extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      employeesSearch: [],
      project: [],
      search: "" ///line added
    };

    this.assign = this.assign.bind(this);
    this.filterList = this.filterList.bind(this);
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
      if (newAssign) {
        console.log("bla");
      }
    } catch (error) {}
  }

  filterList() {
    const requiredSkill = this.state.search.toLowerCase();
    console.log(requiredSkill);
    if (!requiredSkill) {
      this.setState({
        employeesSearch: this.state.employees
      });
      return;
    }

    const filtered = this.state.employees.filter(emp => {
      const skills = [...emp.technicalSkills, ...emp.productSkills];

      for (const skill of skills) {
        if (skill.name.toLowerCase() == requiredSkill) {
          return true;
        }
      }
      return false;
    });

    // console.log(
    //   filtered.map(emp => {
    //     return emp.name;
    //   })
    // );

    this.setState({
      employeesSearch: filtered
    });
  }
  showAdvancedSearch() {
    const advancedSearchOptions = document.querySelector(
      "#advancedSearchOptions"
    );

    if (advancedSearchOptions.style.display == "flex") {
      advancedSearchOptions.style.display = "none";
    } else {
      advancedSearchOptions.style.display = "flex";
    }
  }

  render() {
    return (
      <>
        {/* <div className="row" style={{ width: "300x" }}> */}
        {/* <div className="col-md-6"> */}
        <div
          className="card d-flex justify-content-center  mt-3"
          style={{
            width: "700px",
            marginLeft: "230px",
            marginTop: "20px",
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

            <p> Technical Skills: 
            {this.state.project.technicalSkill && this.state.project.technicalSkill.map((skill, index) => {
              return (
                <SkillBadge
                key={index}
                name={skill.name}
                level={skill.level}
                type={"Tech"}
                />
                );
              })} </p>

          <p> Product Skills:  
            {this.state.project.productSkill && this.state.project.productSkill.map((skill, index) => {
              return (
                <SkillBadge
                key={index}
                name={skill.name}
                level={skill.level}
                type={"Pro"}
                />
                );
              })} </p>



            <Link to="/Projects" className="float-right">
              Back to projects
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center  mt-3">
          <input
            className="form-control mr-sm-2 w-25 "
            type="text"
            placeholder="Search by Skill Name"
            aria-label="Search"
            onKeyUp={e => this.setState({ search: e.target.value })}
          />

          <button
            className="btn btn-outline-success my-2 my-sm-0 mr-2"
            type="submit"
            onClick={this.filterList}
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
