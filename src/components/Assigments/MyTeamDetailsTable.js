import React from "react";
import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";

export default class MyTeamDetailsTable extends React.Component {
  render() {
    return (
      <>
        <div
          className="row justify-content-center"
        >
          <div className="col-2 col-md-8 col-sm-4 col-lg-8 ">
          <table
            className="table "
            style={{
              // display: "block",
              border: "1px solid black"
            }}
          >
            <thead className="thead-dark">
              <tr>
                <th >Name</th>
                <th >Employee Number</th>
                <th >Technical Skills</th>
                <th >Product Skills</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.employees.map(employee => {
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
                        onClick={e =>
                          this.props.onAssign(
                            employee.id,
                            this.props.project.id,
                            2,
                            employee.managerID
                          )
                        }
                      >
                        Assign
                      </button>


                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          
        </div>
      </>
    );
  }
}
