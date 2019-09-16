import React, { Component } from "react";
import DataService from "../../services/SkillsDataService";
import SkillsOverViewTab from "./SkillsOverViewTab";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddSkill from "./AddSkill";
import { SnackBar, showSnackBar } from "../shared-components/SnackBar";

const productSkills = "productSkills";
const technicalSkills = "technicalSkills";

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
    this.toggleAddSkill = this.toggleAddSkill.bind(this);
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
        showSnackBar(error.message);
      });
  }

  deleteSkill(type, id) {
    DataService.removeUnapprovedSkillById(id)
      .then(resp => {
        showSnackBar("Delete Successful");
      })
      .catch(error => {
        showSnackBar(error.message);
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
  }

  addSkill(skillName, date, level, type) {
    console.log(skillName, date, level, type);
    DataService.addNewSkill(3, skillName, date, level, type)
      .then(resp => {
        if (resp.data) {
          showSnackBar("Skill addition was successful");
        }
      })
      .catch(error => {
        showSnackBar(error.message);
      });
  }

  toggleAddSkill() {
    confirmAlert({
      title: "Add Skill",
      customUI: ({ onClose }) => (
        <AddSkill submitNewSkill={this.addSkill} close={onClose} />
      ),
      closeOnEscape: true,
      closeOnClickOutside: true
    });
  }

  switchTab(type) {
    this.setState({ currentTab: type });
  }

  submitUpdate(type, id, grade) {
    DataService.updateSkillByIdSkill(id, grade)
      .then(resp => {
        if (resp.status === 200) {
          showSnackBar(`Skill with name ${resp.data.skillName}`, 3000);
        }
      })
      .catch(error => {
        showSnackBar(error.message, 3000);
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
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="col card">
            <div className="card-body" width="inherit">
              <div className="col-12">
                <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="technicalSkills-tab"
                      data-toggle="tab"
                      href="#technicalSkills"
                      role="tab"
                      aria-selected="true"
                      onClick={e => this.switchTab(technicalSkills)}
                    >
                      Technical Skills confirmations
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="productSkills-tab"
                      data-toggle="tab"
                      href="#productSkills"
                      role="tab"
                      aria-selected="false"
                      onClick={e => this.switchTab(productSkills)}
                    >
                      Product Skills confirmations
                    </a>
                  </li>
                </ul>

                <div className="tab-content ml-1" id="myTabContent">
                  <SkillsOverViewTab
                    type={this.state.currentTab}
                    skills={this.state[this.state.currentTab]}
                    deleteClick={this.deleteSkill}
                    submitUpdate={this.submitUpdate}
                    submitNewSkill={this.addSkill}
                    toggleAddSkill={this.toggleAddSkill}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SnackBar />
      </div>
    );
  }
}
export default MyOwnSkills;
