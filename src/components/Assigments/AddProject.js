import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAd,
  faAtom,
  faClock,
  faCalendarday
} from "@fortawesome/free-solid-svg-icons";

import InputErrors from "./InputError";
import { toast } from "react-toastify";
import SkillColor from "./SkillColor";
import Api from "./Api";
export default class AddProject extends React.Component {
  constructor() {
    super();
    this.state = {
      projectname: {
        value: "",
        errors: [],
        validations: { required: true, minLength: 2 }
      },
      description: { value: "", errors: [], validations: { required: true } },
      date: { value: "", errors: [], validations: { required: true } },
      skillType: { value: "0", errors: [], validations: { required: true } },
      level: { value: "", errors: [], validations: { required: true } },
      skill: { value: "", errors: [], validations: { required: true } }, //chose skill
      skills: { type: "", skills: [] },
      requiredSkills: []
    };

    this.skills = {};

    this.selectSkillType = this.selectSkillType.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.addskill = this.addskill.bind(this);
    this.removeSkill = this.removeSkill.bind(this);
    this.selectSkillLevel = this.selectSkillLevel.bind(this);
  }

  componentDidMount() {
    //fetch student data from the server using the student id
    //*student id should be received from the routing system
    //After getting the data from the server:
    //update state!
    // const data=Api.getSkills()

    fetch("http://localhost:8080/api/skills/")
      .then(response => response.json())
      .then(
        skills =>
          (this.skills = {
            technicals: skills.technicalSkills.map(skill => ({
              id: skill.skillId,
              name: skill.skillName
            })),
            product: skills.productSkills.map(skill => ({
              id: skill.skillId,
              name: skill.skillName
            }))
          })
      );
  }

  addskill(e) {
    e.preventDefault();
    //  let obj = {id: this.state.skills.find(skill => skill.id == this.state.skill.value),level:this.state.level.value};

    for (var tmp of this.state.requiredSkills) {
      if (this.state.skill.value === tmp.skillr.id) {
        return;
      }
    }

    let obj = {
      skillr: this.state.skills.skills.find(
        skill => skill.id == this.state.skill.value
      ),
      level: this.state.level.value,
      type: this.state.skills.type
    };

    this.setState({
      requiredSkills: [...this.state.requiredSkills, obj]
    });
  }

  removeSkill(skillId) {
    this.setState({
      requiredSkills: this.state.requiredSkills.filter(
        skill => skill.skillr.id != skillId
      )
    });
  }

  selectSkillType(event) {
    const skillType = event.target.value;
    let skills = { type: "", skills: [] };
    if (skillType == 1) {
      skills = { type: "t", skills: this.skills.technicals };
    } else if (skillType == 2) {
      skills = { type: "p", skills: this.skills.product };
    }
    this.setState({ skills });
  }

  selectSkillLevel(event) {
    const skillLevel = event.target.value;
    this.setState({ level: { ...this.state.level, value: skillLevel } });
  }

  inputChange({ target: { name, value } }) {
    const { validations } = this.state[name];
    const errors = [];

    if (!validations) return;

    if (validations.required) {
      if (!value) {
        errors.push(`${name} is required`);
      }
    }

    if (validations.minLength) {
      if (value.length < validations.minLength) {
        errors.push(
          `${name} should be at least ${validations.minLength} characters`
        );
      }
    }
    //console.log(this.state[name]);
    this.setState({
      [name]: {
        ...this.state[name],
        value: value,
        errors
      }
    });
  }

  async submit(e) {
    e.preventDefault();
    if (!this.state.projectname.value) {
      // toast.error("No Project Name Provided ");
      return;
    }
    if (!this.state.date.value) {
      // toast.error("Choose Start Date ");
      return;
    }
    if (!this.state.description.value) {
      // toast.error("No Description Provided ");
      return;
    }
    if (this.state.requiredSkills.length === 0) {
      // toast.error("No Skills Selected");
      return;
    }
    if (!this.state.skill.value) {
      // toast.error("Choose Skill");
      return;
    }

    if (!this.state.level.value) {
      // toast.error("Choose Skill Level");
      return;
    }

    let index = 0;
    const values = {
      name: this.state.projectname.value,
      description: this.state.description.value,
      startDate: this.state.date.value,
      technicalSkill: this.state.requiredSkills
        .filter(skill => skill.type == "t")
        .map(skill => ({
          id: skill.skillr.id,
          name: skill.skillr.name,
          level: skill.level
        })),
      productSkill: this.state.requiredSkills
        .filter(skill => skill.type == "p")
        .map(skill => ({
          id: skill.skillr.id,
          name: skill.skillr.name,
          level: skill.level
        }))
    };
    try {
      const projectResponse = await Api.addNewProject(values);
      console.log(projectResponse);
      if (projectResponse.status === 200) {
        toast.success("Project Added Successfully");
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.status == "BAD_REQUEST") {
        toast.error(error.response.data.errorMessage);
      }
    }
  }

  render() {
    return (
      <>
        <div className="card  my-1 p-2 shadow m-12 mt4 mb4" role="alert">
          <h4 className="alert-heading text-center ">Add Project</h4>
          <hr></hr>
          <form onSubmit={this.submit}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectnamename">
                  <h6>Project Name</h6>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <FontAwesomeIcon icon={faAtom}></FontAwesomeIcon>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Project name"
                    aria-label="Projectname"
                    aria-describedby="basic-addon1"
                    id="ProjectnameID"
                    name="projectname"
                    defaultValue={this.state.projectname.value}
                    onBlur={this.inputChange}
                  ></input>
                </div>
                <InputErrors errors={this.state.projectname.errors} />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="StartDate">
                  <h6>Start Date</h6>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                    </span>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="/ / "
                    aria-label="date"
                    aria-describedby="basic-addon1"
                    id="dateID"
                    name="date"
                    defaultValue={this.state.date.value}
                    onBlur={this.inputChange}
                  ></input>
                </div>
                <InputErrors errors={this.state.date.errors} />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-12 ">
                <label htmlFor="projectDescription">
                  <h6>Description</h6>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <FontAwesomeIcon icon={faAd}></FontAwesomeIcon>
                    </span>
                  </div>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    aria-label="Description"
                    aria-describedby="basic-addon1"
                    id="projectDescriptionID"
                    name="description"
                    defaultValue={this.state.description.value}
                    onBlur={this.inputChange}
                  ></textarea>
                </div>
                <InputErrors errors={this.state.description.errors} />
              </div>
            </div>
            <h6 class="mt-4 mb-0 ">Pre Required Skills For Project</h6>
            <hr></hr>
            <div className="row ">
              <div className="col-md-3 col-lg-3 col-sm-3 ">
                <div className="form-group">
                  <label htmlFor="skilltype">
                    <h6>Type</h6>
                  </label>
                  <select
                    className="form-control"
                    id="skillType"
                    name="skillType"
                    defaultValue={this.state.skillType.value}
                    onBlur={this.inputChange}
                    onChange={this.selectSkillType}
                  >
                    <option value="0">Select</option>
                    <option value="1">Technical</option>
                    <option value="2">Product</option>
                  </select>
                </div>
                <InputErrors errors={this.state.skillType.errors} />
              </div>

              <div className="col-md-3 col-lg-3 col-sm-3  ">
                <div className="form-group">
                  <label htmlFor="skilltype">
                    <h6>Skill</h6>
                  </label>

                  <select
                    className="form-control"
                    id="skill"
                    name="skill"
                    defaultValue={this.state.skill.value}
                    onBlur={this.inputChange}
                  >
                    <option value="">Select</option>
                    {this.state.skills.skills.map(skill => (
                      <option value={skill.id}>{skill.name}</option>
                    ))}
                  </select>
                </div>
                <InputErrors errors={this.state.skill.errors} />
              </div>

              <div className="col-md-3 col-lg-3 col-sm-3 ">
                <div className="form-group">
                  <label htmlFor="skilltype">
                    <h6>Level</h6>
                  </label>
                  <select
                    className="form-control"
                    id="levelid"
                    name="level"
                    defaultValue={this.state.level.value}
                    onBlur={this.inputChange}
                    onChange={this.selectSkillLevel}
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                  </select>
                </div>
                <InputErrors errors={this.state.level.errors} />
              </div>

              <div className="col-md-3 col-lg-3  col-sm-3 ">
                <div>
                  <label htmlFor="skilltype">
                    <h6>Action</h6>
                  </label>
                  <button
                    className="btn btn-info btn-block"
                    onClick={this.addskill}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h6>Selected Skills</h6>
              </div>
              {this.state.requiredSkills.length ? (
                this.state.requiredSkills.map((el, index) => {
                  return (
                    <div className="col-md-3">
                      <SkillColor
                        key={el.skillr.id}
                        id={el.skillr.id}
                        name={el.skillr.name}
                        level={el.level}
                        type={el.type}
                        removeSkill={this.removeSkill}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="col-md-12">No Selected Skills Yet</div>
              )}
            </div>
            <div className="col-md-12 mt-1">
              <button
                type="submit"
                className="btn btn-info btn-block"
                onClick={this.submit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
