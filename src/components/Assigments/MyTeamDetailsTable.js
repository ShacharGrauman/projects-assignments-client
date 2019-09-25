import React from "react";
import Pagination from '../users-list/Pagination'
import SkillBadge from "./SkillBadge";
import { noAuto } from "@fortawesome/fontawesome-svg-core";

export default class MyTeamDetailsTable extends React.Component {
  render() {
    return (
      <>


        <div className="d-flex justify-content-center align-items-center mb-4 mt-3">
          <div className="col-2 col-md-8 col-sm-4 col-lg-8 " style={{paddingRight: '50%'}}>
          <table 
            className="table "
            style={{
              //justifyContent:'center',
              margin: "auto",
              display: "block",
              border: "1px solid black",
              width: '1200px'
            }}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{width: '20%'}}>Name</th>
                <th scope="col" style={{width: '10%'}}>Employee Number</th>
                <th scope="col" style={{width: '30%'}}>Technical Skills</th>
                <th scope="col" style={{width: '30%'}}>Product Skills</th>
                <th scope="col" style={{width: '10%'}}>Actions</th>
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
          <div>
            <Pagination />
          </div>
          </div>
          
        </div>
      </>
    );
  }
}
