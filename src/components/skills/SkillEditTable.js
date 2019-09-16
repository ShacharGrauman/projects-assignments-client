import React, { Component } from "react";

class SkillEditTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.skill.level,
      err: null,
      maxLevel: 5,
      minLevel: 1
    };
    this.trySubmit = this.trySubmit.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
  }

  inputChanged(e) {
    if (e.target.value === "") {
      this.setState({ err: `Grade field is empty!` });
    } else if (e.target.value > this.state.maxLevel) {
      this.setState({
        err: `Grade must be lower than or equal to ${this.state.maxLevel}`
      });
    } else if (e.target.value < this.state.minLevel) {
      this.setState({
        err: `Grade must be higher than or equal to ${this.state.min}`
      });
    } else {
      this.setState({ err: null });
      //}
    }
  }

  trySubmit() {
    if (this.state.value) {
      if (this.state.value === "") {
        this.setState({ err: `Grade field is empty!` });
      } else if (this.state.value > this.state.maxLevel) {
        this.setState({
          err: `Grade must be lower than or equal to ${this.state.maxLevel}`
        });
      } else if (this.state.value < this.state.minLevel) {
        this.setState({
          err: `Grade must be higher than or equal to ${this.state.min}`
        });
      } else {
        this.props.submitUpdate.call(
          this,
          this.props.type,
          this.props.skill.employeeSkillId,
          this.state.value
        );
      }
    }
  }

  render() {
    const { type, cancelUpdate, submitUpdate, skill } = this.props;
    return (
      <div>
        <table className="table table-hover table-sm">
          <thead className="thead-dark">
            <tr>
              <th>Skill</th>
              <th>Grade</th>
              <th>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={cancelUpdate.bind(this)}
                >
                  <span>X</span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{skill.skillName}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={this.state.value}
                  onBlur={this.inputChanged}
                  onChange={e => this.setState({ value: e.target.value })}
                />
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={this.trySubmit}
                >
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {this.state.err ? (
          <div class="alert alert-danger" role="alert">
            {this.state.err}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default SkillEditTable;
