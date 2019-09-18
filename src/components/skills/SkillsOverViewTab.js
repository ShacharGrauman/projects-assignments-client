import React, { Component } from "react";
import Chart from "react-google-charts";
import MySkillsTable from "./MySkillsTable";
import SkillEditTable from "./SkillEditTable";

class SkillsOverViewTab extends Component {
  constructor() {
    super();
    this.state = {
      editInput: null,
      data: []
    };
    this.updateSkill = this.updateSkill.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateSkill(type, id) {
    const value = this.props.skills.find(skill => skill.employeeSkillId === id);
    this.setState({ editInput: value });
  }

  cancelUpdate(e) {
    this.setState({ editInput: null });
  }

  submit(type, id, grade) {
    this.props.submitUpdate(type, id, grade);
    //req();
    this.setState({ editInput: null });
  }

  render() {
    const { type, skills, deleteClick, submitNewSkill } = this.props;
    return (
      <div
        className=" tab-pane show active"
        id={`v-pills-${type}`}
        role="tabpanel"
        aria-labelledby={`v-pills-${type}-tab`}
      >
        <div className="row">
          <div className=" col-lg-6">
            <div className="google-chart">
              <Chart
                width="inherit"
                height="300px"
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={this.props.data}
                options={{
                  title: `Skills Progress`,
                  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
                  vAxis: { minValue: 0 },
                  // For the legend to fit, we make the chart area smaller
                  chartArea: { width: "50%", height: "70%" }
                  // lineWidth: 25
                }}
              />
            </div>
          </div>

          <div className=" col-lg-6">
            {!this.state.editInput ? (
              <MySkillsTable
                type={type}
                skills={skills}
                deleteClick={deleteClick}
                updateClick={this.updateSkill}
                submitNewSkill={submitNewSkill}
              />
            ) : (
              ""
            )}
            {this.state.editInput ? (
              <SkillEditTable
                type={type}
                skill={this.state.editInput}
                submitUpdate={this.submit}
                cancelUpdate={this.cancelUpdate}
                inputChanged={this.inputChanged}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SkillsOverViewTab;
