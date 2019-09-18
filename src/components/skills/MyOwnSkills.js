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

const fetch = (type, id) => {
  if (type === technicalSkills) {
    return DataService.retrieveTechnicalSkillsHistoryById(id);
  } else if (type === productSkills) {
    return DataService.retrieveProductSkillsHistoryById(id);
  }
};

class MyOwnSkills extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      currentTab: technicalSkills,
      [productSkills]: [],
      [skills]: [],
      [technicalSkills]: [],
      skillsHistory: []
    };
    this.refetch = this.refetch.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.toggleAddSkill = this.toggleAddSkill.bind(this);
    this.proccessData = this.proccessData.bind(this);
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

    fetch(this.state.currentTab, id)
      .then(resp => this.setState({ skillsHistory: resp.data }))
      .catch(error => {
        showSnackBar(
          `${this.state.currentTab} error fetching skills history ${error.message}`
        );
        // this.setState({ skillsHistory: [] });
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

  addSkill(skillId, skillName, level, type, date) {
    console.log(this.state.id, skillId, skillName, level, type);

    DataService.addNewSkill(
      this.state.id,
      skillId,
      skillName,
      level,
      type,
      date
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
      closeOnClickOutside: false
    });
  }

  switchTab(type) {
    const { id } = this.props.match.params;
    let data = [];

    fetch(type, id)
      .then(resp => this.setState({ skillsHistory: resp.data }))
      .catch(error => {
        showSnackBar(`${type} error fetching skills history ${error.message}`);
        this.setState({ skillsHistory: [] });
      });

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

  proccessData() {
    const skills = [];
    if (this.state.skillsHistory.length === 0) {
      return [["Year", "Skill"], [new Date().getFullYear(), 0]];
    }

    this.state.skillsHistory.forEach(skill => {
      skills.push(
        ...skill.updates.map(update => {
          return {
            skillName: skill.name,
            date: update.date,
            level: update.level
          };
        })
      );
    });

    const skillNames = [...new Set(skills.map(skill => skill.skillName))];
    const header = ["Year", ...skillNames];
    const years = [
      ...new Set(skills.map(skill => new Date(skill.date).getFullYear()))
    ];
    const body = [];
    const prevGrade = new Array(header.length - 1).fill(0);
    years.sort((y1, y2) => y1 > y2);

    years.forEach(year => {
      skills
        .filter(skill => new Date(skill.date).getFullYear() === year)
        .forEach(skill => {
          const index = skillNames.indexOf(skill.skillName);
          prevGrade[index] = parseInt(`${skill.level}`);
        });

      body.push([`${year}`, ...prevGrade]);
    });

    return [header, ...body];
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
                    data={this.proccessData()}
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
