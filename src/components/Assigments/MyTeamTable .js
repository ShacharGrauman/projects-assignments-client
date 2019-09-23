import React from "react";

// import { getEmployeeForAssignments } from "./api";
import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";
import MyTeamDetailsTable from "./MyTeamDetailsTable";
import Api from "./Api";
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const SearchByNameStyle = {
  cursor: "pointer",
  color: "blue",
  textDecoration: "underline"

}
const employeeNameSearchStyle = {
  display: "none"
}



export default class MyTeamTable extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      employeesSearch: [],
      project: [],
      search: "",
      searchEmp: ""
    };

    this.assign = this.assign.bind(this);
    this.filterList = this.filterList.bind(this);
    this.filterListByEmpName=this.filterListByEmpName.bind(this);
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
        toast.success("Assigment success")
      }
    } catch (error) {}
  }

  filterList(e) {
    e.preventDefault();

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

    // console.log(
    //   filtered.map(emp => {
    //     return emp.name;
    //   })
    // );

    this.setState({
      employeesSearch: filtered
    });
  }


  filterListByEmpName(e) {
    e.preventDefault();


    if (!this.state.searchEmp.toLowerCase()) {
      this.setState({
        employeesSearch: this.state.employees
      });
      return;}

    const employeeName = this.state.searchEmp.toLowerCase();
    
    
     const empFiltered = this.state.employees.filter(
       (emp) => {return  (emp.name.toLowerCase().includes(employeeName)) }
    );
      console.log(empFiltered)

    this.setState({//
      employeesSearch: empFiltered//
     });

}



  showEmployeeNameSearch() {
    const employeeNameSearch = document.querySelector('#employeeNameSearch');

    if (employeeNameSearch.style.display == "flex") {
        employeeNameSearch.style.display = "none";

    }
    else {
        employeeNameSearch.style.display = "flex";
    }
}



  render() {
    return (
      <>
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
        {/* </div> */}

        {/* <div className="col md-3"></div>
        </div> */}

        <form>
       
        <div className="d-flex justify-content-center align-items-center  mt-3">
        
        <div className="">
          <h6 className="">Skill: </h6>
          
          <input
            className="col-md-11 "
            type="text"
            placeholder="Search by Skill Name"
            aria-label="Search"
            onKeyUp={e => this.setState({ search: e.target.value })}
          />
        </div>
          <div className="" >
            <h6 className="">Skill's Level :</h6>
            <div className="form-check-inline m-0 align-items-end">
                <select className="form-control">
                    <option value="all levels">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
        <div className="" >
          <h6 className="ml-4">Search:</h6>  


          <button onClick={this.filterList} className=" btn btn-outline-success mx-1" style={{ borderRadius: "50%" }}>
              <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>


{/*
          <button
            className="btn btn-outline-info"
            type="button"
            data-toggle="collapse"
            aria-expanded="true"
            aria-controls="collapseOne"
            onClick={this.toggleDiv}
            onClick={this.showEmployeeNameSearch}
          >
          Search by employee name
          </button>*/}


          <a style={SearchByNameStyle} className="justify-content-md-center ml-4 mt-4" onClick={this.showEmployeeNameSearch}> Search by employee name </a>
          </div>
          </form>
          <form
         className="d-flex justify-content-center align-items-center mb-4 mt-3"
          >
            
          <div id="employeeNameSearch" style={employeeNameSearchStyle}>
              <div className="row">                            
                  <div className="col-md-6 mr-4" >
                      <h6 className="">Employee Name:</h6>
                      <input
                          type="text"
                          className="form-control mr-4 "
                          placeholder="Search by Emp. Name"
                          onKeyUp={e => this.setState({ searchEmp: e.target.value })}
                          />
                  </div>
                  <div className="col-md-2">
                      <h6 className="">Search:</h6>
                    <button onClick={this.filterListByEmpName} className=" btn btn-outline-success mr-5 mx-1" style={{ borderRadius: "50%" }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                  </div>
                </div>
              </div>                     
        </form>
        



        <div className="d-flex justify-content-center align-items-center"
        style={{marginBottom:"50px"}}>
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
