import React, { Component } from "react";
import DataService from "../../services/SkillsDataService";
import SkillsOverViewTab from "./SkillsOverViewTab";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddSkill from "./AddSkill";
import Loading from "../shared-components/Loading";
import Loading2 from "../common/loading";
const skills = "skills";
const productSkills = "productSkills";
const technicalSkills = "technicalSkills";
const skillsHistory = "skillsHistory";

const LoadingComponent = Loading(SkillsOverViewTab);

class MyOwnSkills extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      currentTab: technicalSkills,
      [productSkills]: [],
      [skills]: [],
      [technicalSkills]: [],
      skillsHistory: [],
      loading: true,
      flag:true
    };

    this.container = {};

    this.refetch = this.refetch.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.toggleAddSkill = this.toggleAddSkill.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    DataService.fetchDataList(
      this,
      DataService.retrieveTechnicalSkillsById,
      id,
      technicalSkills
    );
    DataService.fetchDataList(
      this,
      DataService.retrieveProductSkillsById,
      id,
      productSkills
    );

    DataService.fetchDataList(this, DataService.getAllSkills, id, skills);

    DataService.fetchSkillsHistory(
      this,
      this.state.currentTab,
      id,
      skillsHistory
    );
    setTimeout(() => {
      this.setState({
          flag:false
      })
  }, 1000);
  }

  deleteSkill(id) {
    DataService.sendPostRequest.call(
      this,
      "Delete",
      DataService.removeUnapprovedSkillById,
      { id }
    );
  }

  addSkill(skillId, skillName, level, type) {
    const { id } = this.props.match.params;
    console.log(type);
    DataService.sendPostRequest.call(
      this,
      "Add Skill",
      DataService.addNewSkill,
      { employeeId: id, skillId, skillName, level, type }
    );
  }

  submitUpdate(type, id, grade) {
    DataService.sendPostRequest.call(
      this,
      "Update Skill",
      DataService.updateSkillByIdSkill,
      { id, level: grade }
    );
  }

  refetch() {
    const { id } = this.props.match.params;
    DataService.fetchDataList(
      this,
      DataService.retrieveTechnicalSkillsById,
      id,
      technicalSkills
    );
    DataService.fetchDataList(
      this,
      DataService.retrieveProductSkillsById,
      id,
      productSkills
    );
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
      closeOnClickOutside: false
    });
  }

  switchTab(type) {
    const { id } = this.props.match.params;

    console.log(type);
    DataService.fetchSkillsHistory(this, type, id, skillsHistory);

    this.setState({ currentTab: type });
  }

  render() {
    return (
      this.state.flag ?<Loading2 />  :
      <div className="container mt-4">
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
                <LoadingComponent
                  isLoading={this.state.loading}
                  type={this.state.currentTab}
                  skills={this.state[this.state.currentTab]}
                  data={this.state.skillsHistory}
                  deleteClick={this.deleteSkill}
                  submitUpdate={this.submitUpdate}
                  submitNewSkill={this.addSkill}
                />
              </div>
              <div className="float-right float-top">
                <button
                  className="btn btn-primary btn-sm"
                  disabled={this.state.loading}
                  onClick={this.toggleAddSkill}
                >
                  Add New Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MyOwnSkills;
