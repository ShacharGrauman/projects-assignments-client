import React from "react";
import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";

export default class MyTeamDetailsTable extends React.Component {
  render() {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center mb-4 mt-3"
        >
          <table
            className="table"
            style={{
              overflowY: "scroll",
              height: "400px",
              display: "block",
              width: "70%",
              margin: "10px",
              border: "1px solid black",
              textAlign: "center"
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
                              <b>{this.props.project.name}</b>
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
        </div>
      </>
    );
  }
}
