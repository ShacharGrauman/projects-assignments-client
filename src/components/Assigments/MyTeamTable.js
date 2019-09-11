import React from "react";

 import { api } from "../../mock-data/api"
import { Link } from "react-router-dom";
import SkillBadge from "./SkillBadge";

export default class MyTeamTable extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    }
    this.assign = this.assign.bind(this);
  }

  componentDidMount() {
    //Ya'ani call to the server for data
    const employees = api.getMyTeam();
    this.setState({ employees });
  }

  assign(empId) {
    console.log(empId);
  }

  render() {
    return (
      <>
        <div className="row" style={{ width: "300x" }}>
          <div className="col md-3"></div>

          <div className="col md-6">
            <div className="card">
              <div className="card-header">Project : Vodafone</div>
              <div className="card-body">
                <h5 className="card-title">Raneem Daher</h5>
                <p className="card-text">Project : VodaPhone</p>
                <p className="card-text">ID : "12332"</p>

                <button className="btn btn-outline-info">
                  <Link to="/Projects">Back</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col md-3"></div>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
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
        <table
          className="table"
          style={{
            width: "70%",
            marginLeft: "200px",
            marginTop: "20px",
            border: "1px solid black",
            textAlign: "center"
          }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">ID</th>
              <th scope="col">Technical Skills</th>
              <th scope="col">Product Skills</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => {
              return (
                <tr key={employee.id}>
                  <td>
                    <img src={employee.img} style={{ width: "50px" }}></img>
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
                      data-target="#exampleModal"
                    >
                      Assign
                    </button>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
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
                            Employee {employee.name} Added To Project VodaPhone
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
                    {/* <input
                      type="button"
                      value="Assign"
                      onClick={e => this.assign(employee.id)}
                    ></input> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}
