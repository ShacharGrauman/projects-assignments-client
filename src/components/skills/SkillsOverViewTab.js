import React, { Component } from "react";
import Chart from "react-google-charts";
import MySkillsTable from "./MySkillsTable";
import SkillEditTable from "./SkillEditTable";

class SkillsOverViewTab extends Component {
  constructor() {
    super();
    this.state = {
      editInput: null
    };
    this.updateSkill = this.updateSkill.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.submit = this.submit.bind(this);
    this.proccessData = this.proccessData.bind(this);
  }

  updateSkill(type, id) {
    const value = this.props.skills.find(skill => skill.employeeSkillId === id);

    this.setState({ editInput: value });
  }

  cancelUpdate(e) {
    this.setState({ editInput: null });
  }

  proccessData() {
    const { skills } = this.props;
    const skillNames = [...new Set(skills.map(skill => skill.skillName))];
    const header = ["Year", ...skillNames];
    const years = [
      ...new Set(skills.map(skill => new Date(skill.date).getFullYear()))
    ];
    const body = [];
    const prevGrade = new Array(header.length - 1).fill(0);

    years.forEach(year => {
      skills
        .filter(skill => new Date(skill.date).getFullYear() === year)
        .forEach(skill => {
          const index = skillNames.indexOf(skill.skillName);
          prevGrade[index] = parseInt(`${skill.level}`);
        });

      body.push([`${year}`, ...prevGrade]);
    });

    body.sort((arr1, arr2) => arr1[0] > arr2[0]);

    return [header, ...body];
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
                data={this.proccessData()}
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
