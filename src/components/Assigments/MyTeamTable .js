import React from "react";

// import { getEmployeeForAssignments } from "./api";
import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";
import MyTeamDetailsTable from "./MyTeamDetailsTable";
import Api  from './Api';
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
    //Ya'ani call to the server for data
    //should be manager ID form Login
    fetch(`http://localhost:8080/api/team/1?pageNumber=1&limit=10`)
      .then(response => response.json())
      .then(employees => {
        this.setState({
          employees,
          employeesSearch: employees
        });
      });
    
  
    this.setState({ project: JSON.parse(sessionStorage.getItem("Project")) });
  }

  assign(empId) {
    console.log(empId);
  }

  filterList() {
    //Let's say we got the searched employees
    //Let's merge technical and product skills all together
    //And search the skill

    //for each employee, merge the 2 arrays and search this array
    //If found - return it

    //So we'll have all the employees having this searched skill
    //debugger;

    const requiredSkill = this.state.search.toLowerCase();
   // console.log(requiredSkill);
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

    console.log(
      filtered.map(emp => {
        return emp.name;
      })
    );

    this.setState({
      employeesSearch: filtered
    });
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
                marginLeft: "230px",
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

                <Link to="/Projects" className="btn btn-outline-info">
                  Back to projects
                </Link>
              </div>
            </div>
          </div>

          <div className="col md-3"></div>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
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
            onClick={this.toggleDiv}
          >

            Advanced search...
          </button>


        </div>

        <MyTeamDetailsTable
          project={this.state.project}
          employees={this.state.employeesSearch}
        />
      </>
    );
  }
}
