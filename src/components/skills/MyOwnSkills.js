import React, { Component } from "react";
import DataService from "../../services/SkillsDataService";
import SkillsOverViewTab from "./SkillsOverViewTab";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddSkill from "./AddSkill";
import { SnackBar, showSnackBar } from "../shared-components/SnackBar";

const skills = "skills";
const productSkills = "productSkills";
const technicalSkills = "technicalSkills";

class MyOwnSkills extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      currentTab: technicalSkills,
      [productSkills]: [],
      [skills]: [],
      [technicalSkills]: []
    };
    this.refetch = this.refetch.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.toggleAddSkill = this.toggleAddSkill.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    Promise.all([
      DataService.retrieveTechnicalSkillsById(id),
      DataService.retrieveProductSkillsById(id),
      DataService.getAllSkills()
    ])
      .then(([technicalData, productData, skillsData]) => {
        this.setState({
          id,
          technicalSkills: technicalData.data,
          productSkills: productData.data,
          skills: skillsData.data
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
      .finally(() => this.refetch());
  }

  addSkill(skillId, skillName, level, date, type) {
    console.log(this.state.id, skillId, skillName, level);
    DataService.addNewSkill(
      this.state.id,
      skillId,
      skillName,
      level,
      date,
      type
    )
      .then(resp => {
        if (resp.data) {
          showSnackBar("Skill addition was successful");
        }
      })
      .catch(error => {
        showSnackBar(error.message);
      })
      .finally(() => this.refetch());
  }

  toggleAddSkill() {
    confirmAlert({
      title: "Add Skill",
      customUI: ({ onClose }) => (
        <AddSkill
          submitNewSkill={this.addSkill}
          close={onClose}
          product={this.state.skills.productSkills}
          technical={this.state.skills.technicalSkills}
        />
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
          showSnackBar(`Skill Updated`, 3000);
        }
      })
      .catch(error => {
        showSnackBar(error.message, 3000);
      })
      .finally(() => this.refetch());
  }

  refetch() {
    Promise.all([
      DataService.retrieveTechnicalSkillsById(this.state.id),
      DataService.retrieveProductSkillsById(this.state.id)
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

                  <li className="nav-item"></li>
                </ul>

                <div className="tab-content ml-1" id="myTabContent">
                  <SkillsOverViewTab
                    type={this.state.currentTab}
                    skills={this.state[this.state.currentTab]}
                    deleteClick={this.deleteSkill}
                    submitUpdate={this.submitUpdate}
                    submitNewSkill={this.addSkill}
                  />
                </div>
                <div className="float-right float-top">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={this.toggleAddSkill}
                  >
                    Add New Skill
                  </button>
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
