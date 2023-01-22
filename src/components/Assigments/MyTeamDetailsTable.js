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
          <div className="col-10 col-md-8 col-sm-4 col-lg-8 ">
          <table
            className="table "
            style={{
              border: "1px solid black",
              width: '100%'
            }}
          >
            <thead className="thead-dark">
              <tr>
              <th scope="col">Name</th>
                <th scope="col">Employee Number</th>
                <th scope="col">Technical Skills</th>
                <th scope="col">Product Skills</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.props.employees.map(employee => {
                return (
                  <tr key={employee.id}>
                    <td style={{width: '20%'}}>
                      {/* <img src={employee.img} style={{ width: "50px" }}></img> */}
                      <a href="#">{employee.name}</a>
                    </td>

                    <td style={{width: '10%'}}>{employee.id}</td>

                    <td style={{width: '30%'}}>
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
                    <td style={{width: '30%'}}>
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
                    <td style={{width: '10%'}}>
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
