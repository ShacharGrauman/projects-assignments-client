import React, { Component } from "react";

const id = "id";
const level = "level";
const date = "date";
const skillName = "skillName";

class MySkillsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: false,
      [skillName]: null,
      [date]: null,
      [level]: null,
      maxLevel: 5,
      minLevel: 1,
      type: "TECHNICAL",
      minYear: 2009,
      skills: [{ skillName: "CSS" }, { skillName: "CRM" }], // for testing
      // suggested: [],
      err: []
    };
    this.trySubmit = this.trySubmit.bind(this);
    this.newSkill = this.newSkill.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    //this.getSuggestions = this.getSuggestions.bind(this);
  }

  newSkill() {
    this.setState({ addMode: true });
  }

  inputChanged(e) {
    const { type, value } = e.target;
    const err = [];
    switch (type) {
      case "text":
        if (value === "") {
          err.push(`Skill name field is empty!`);
        }
        break;
      case "number":
        if (value === "") {
          err.push(`Grade field is empty!`);
        } else if (value > this.state.maxLevel) {
          err.push(
            `Grade must be lower than or equal to ${this.state.maxLevel}`
          );
        } else if (value < this.state.minLevel) {
          err.push(
            `Grade must be higher than or equal to ${this.state.minLevel}`
          );
        }
        break;

      case "date":
        const date = new Date();
        if (value === "") {
          err.push(`Date field is empty!`);
        } else if (value.split("-")[0] < this.state.minYear) {
          err.push(`date must be later than  ${this.state.minYear}`);
        } else if (new Date(value) > date) {
          err.push(`date must be earlier than  ${date}`);
        }
        break;

      default:
        break;
    }
    this.setState({ err });
  }

  trySubmit(e) {
    if (this.state.err.length === 0)
      this.props.submitNewSkill.call(
        this,
        this.state.skillName,
        this.state.date,
        this.state.level,
        this.state.type
      );
  }

  render() {
    const { type, updateClick, deleteClick, skills } = this.props;
    return (
      <div>
        <div className="row">
          <table className="table table-hover table-sm-12 table-md-12 table-lg-12">
            <thead className="thead-dark">
              <tr>
                {" "}
                <th>Name</th>
                {this.state.addMode ? <th>Type</th> : ""}
                <th>Date</th>
                <th>Grade</th>
                <th>Status</th>
                <th>Comment</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody id="technicalReq">
              {skills.map((skill, index) => (
                <tr key={index}>
                  <td>{skill.skillName}</td>
                  <td>{skill.date}</td>
                  <td>{skill.level}</td>
                  <td>{skill.status}</td>
                  <td>{skill.comment}</td>
                  {skill.status !== "APPROVED" ? (
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={deleteClick.bind(
                          this,
                          type,
                          skill.employeeSkillId
                        )}
                      >
                        {" "}
                        Delete{" "}
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-alert btn-sm"
                        onClick={updateClick.bind(
                          this,
                          type,
                          skill.employeeSkillId
                        )}
                      >
                        {" "}
                        Update
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
              {this.state.addMode ? (
                <tr>
                  <td>
                    <div>
                      <input
                        type="text"
                        name={skillName}
                        width="5px"
                        onChange={e =>
                          this.setState({ skillName: e.target.value })
                        }
                      />
                      {this.state.suggested > 0 ? (
                        <select>
                          {this.state.suggested.map(sug => (
                            <option key={sug} value={sug}>
                              {sug}
                            </option>
                          ))}
                        </select>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                  <td>
                    <select
                      name="Typr"
                      defaultValue={this.state.type}
                      onChange={e => this.setState({ type: e.target.value })}
                    >
                      <optgroup>
                        <option>TECHNICAL</option>
                        <option>PRODUCT</option>
                      </optgroup>
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      name={date}
                      onBlur={this.inputChanged}
                      onChange={e => this.setState({ date: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name={level}
                      width="5px"
                      onBlur={this.inputChanged}
                      min={this.state.minVal}
                      max={this.state.maxVal}
                      onChange={e => this.setState({ level: e.target.value })}
                    />
                  </td>
                  <td>
                    <input type="text" disabled width="5px" />
                  </td>
                  <td>
                    <input type="text" disabled width="5px" />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={this.trySubmit}
                    >
                      Add Skill
                    </button>
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
        </div>
        <div className="row">
          <button className="btn btn-primary btn-sm" onClick={this.newSkill}>
            New Skill
          </button>
        </div>

        {this.state.err.map((e, index) => (
          <div
            className="row alert alert-danger"
            role="alert"
            style={{ marginTop: "5px" }}
            key={index}
          >
            {e}
          </div>
        ))}
      </div>
    );
  }
}

export default MySkillsTable;
