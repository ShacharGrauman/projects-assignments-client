import React, { Component } from "react";
import DataService from "../../services/SkillsDataService";
import SkillsOverViewTab from "./SkillsOverViewTab";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const productSkills = "productSkills";
const technicalSkills = "technicalSkills";

const alert = (title, message, buttons) => {
  return {
    title,
    message,
    buttons
  };
};

class MyOwnSkills extends Component {
  constructor() {
    super();
    this.state = {
      currentTab: technicalSkills,
      [productSkills]: [],
      [technicalSkills]: []
    };
    this.submitUpdate = this.submitUpdate.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.switchTab = this.switchTab.bind(this);
  }

  componentDidMount() {
    Promise.all([
      DataService.retrieveTechnicalSkillsById(3),
      DataService.retrieveProductSkillsById(3)
    ])
      .then(([technicalData, productData]) => {
        this.setState({
          technicalSkills: technicalData.data,
          productSkills: productData.data
        });
      })
      .catch(error => {
        // console.trace(error.message)
        confirmAlert(
          alert(error.status, error.message, [
            { label: "Ok", onClick: () => alert("ok") }
          ])
        );
      });

    /*this.setState({
      productSkills: DataService.retrieveProductSkillsById(2),
      technicalSkills: DataService.retrieveTechnicalSkillsById(2)
    })*/
  }

  deleteSkill(type, id) {
    DataService.removeUnapprovedSkillById(id)
      .then(resp => {
        confirmAlert(
          alert("Delete", "Deletion Successful", [
            { label: "Ok", onClick: () => alert("ok") }
          ])
        );
      })
      .catch(error => {
        confirmAlert(
          alert(error.status, error.message, [
            { label: "Ok", onClick: () => alert("ok") }
          ])
        );
      })
      .finally(() => {
        if (type === productSkills) {
          DataService.retrieveProductSkillsById(3).then(resp => {
            this.setState({ [type]: resp.data });
          });
        } else if (type === technicalSkills) {
          DataService.retrieveTechnicalSkillsById(3).then(resp => {
            this.setState({ [type]: resp.data });
          });
        }
      });

    // this.setState({ [type]: this.state[type].filter(skill => skill.employeeSkillId !== id) })
  }

  addSkill(skillName, date, level, type) {
    DataService.addNewSkill(3, skillName, date, level, type)
      .then(resp => {
        if (resp.data) {
          // display success UI
          confirmAlert(
            alert("Success!", "Skill addition was successful", [
              { label: "Ok", onClick: () => alert("ok") }
            ])
          );
        }
      })
      .catch(error => {
        //display error ui
        confirmAlert(
          alert(error.status, error.message, [
            { label: "Ok", onClick: () => alert("ok") }
          ])
        );
      });
  }

  switchTab(type) {
    this.setState({ currentTab: type });
  }

  submitUpdate(type, id, grade) {
    DataService.updateSkillByIdSkill(id, grade)
      .catch(error => {
        // display error ui
        confirmAlert(
          alert(error.status, error.message, [
            {
              label: "Ok",
              onClick: () => alert("ok")
            }
          ])
        );
      })
      .finally(() => {
        if (type === productSkills) {
          DataService.retrieveProductSkillsById("3").then(resp => {
            this.setState({ [type]: resp.data });
          });
        } else if (type === technicalSkills) {
          DataService.retrieveTechnicalSkillsById("3").then(resp => {
            this.setState({ [type]: resp.data });
          });
        }
      });
    //console.log(type, id, grade)
    /*this.setState({
      [type]: this.state[type].map(skill => {
        if (skill.employeeSkillId === id) {
          skill.level = grade;
        }
        return skill;
      })
    });*/
  }

  render() {
    return (
      <div>
        <SkillsOverViewTab
          type={this.state.currentTab}
          skills={this.state[this.state.currentTab]}
          deleteClick={this.deleteSkill}
          submitUpdate={this.submitUpdate}
          submitNewSkill={this.addSkill}
        />
      </div>
    );
  }
}
export default MyOwnSkills;
