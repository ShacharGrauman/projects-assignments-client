import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAd,
  faAtom,
  faClock,
  faCalendarday
} from "@fortawesome/free-solid-svg-icons";

import InputErrors from "./InputError";

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
      skillType: { value: "", errors: [], validations: { required: true } },
      level: { value: "", errors: [], validations: { required: true } },
      skill: { value: "", errors: [], validations: { required: true } }, //chose skill
      skills: [],
      requiredSkills: []
    };

    this.skills = {
      technicals: [
        { id: 11, name: "Java" },
        { id: 22, name: "C#" },
        { id: 33, name: "HTML" }
      ],
      product: [
        { id: 44, name: "Office" },
        { id: 55, name: "CRM" },
        { id: 66, name: "Singing" }
      ]
    };

    this.selectSkillType = this.selectSkillType.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.addskill = this.addskill.bind(this);
  }

  componentDidMount() {
    //fetch student data from the server using the student id
    //*student id should be received from the routing system
    //After getting the data from the server:
    //update state!
  }

  addskill(e) {
    e.preventDefault();
   //  let obj = {id: this.state.skills.find(skill => skill.id == this.state.skill.value),level:this.state.level.value};
    let obj = {skillr: this.state.skills.find(skill => skill.id == this.state.skill.value),level:this.state.level.value};

    this.setState({
        requiredSkills: [...this.state.requiredSkills, obj]
      },
      () => console.log(this.state.requiredSkills)
    );
  }

  removeSkill(skillId) {
    this.setState(
      {
        requiredSkills: [
          ...this.state.requiredSkills.filter(skill => skill.id === skillId)
        ]
      },
      () => console.log(this.state.requiredSkills)
    );
  }

  selectSkillType() {
    const skillType = this.state.skillType.value;
    let skills = [];
    if (skillType == 1) {
      skills = this.skills.technicals;
    } else if (skillType == 2) {
      skills = this.skills.product;
    }

    this.setState({ skills: [...skills] });
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

    this.setState({
      [name]: {
        ...this.state[name],
        value: value,
        errors
      }
    });
  }

  submit(e) {
    e.preventDefault();

    //1- validate each field
    //2- show errors if any validations failed
    //3- if everything's OK, than send the data to...

    //  for (const key in this.state) {
    //    this.inputChange({ target: { value: this.state[key].value, name: key } });
    // }

    //How can I know if every field is valid?

    //Send the data outside...

    /* const finalResult = Object.keys(this.state).reduce((obj, key) => {
            obj[key] = this.state[key].value;
            return obj;
        }, {});

        //finalResult should be sent outside

        console.log(finalResult);*/

    const values = {
      projectName: this.state.projectname.value,
      description: this.state.description.value,
      date: this.state.date.value,
      skillss: this.state.requiredSkills
    };

    console.log(values);
  }

  render() {
    return (
      <>
        <div className="alert alert-info col-10 " style={{marginLeft:"100px"}} role="alert">
          <h4 className="alert-heading text-center  ">
            Add Project
          </h4>

          <hr></hr>
          <form onSubmit={this.submit}>
            <div className="row  ">
              <div className="col-md-4">
                <label htmlFor="projectnamename">Projectname</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <FontAwesomeIcon
                        icon={faAtom}
                      ></FontAwesomeIcon>
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

              <div className="col-md-4 ">
                <label htmlFor="projectDescription">Description</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <FontAwesomeIcon
                        icon={faAd}
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    aria-label="Description"
                    aria-describedby="basic-addon1"
                    id="projectDescriptionID"
                    name="description"
                    defaultValue={this.state.description.value}
                    onBlur={this.inputChange}
                  ></input>
                </div>
                <InputErrors errors={this.state.description.errors} />
              </div>

              <div className="col-md-4">
                <label htmlFor="StartDate">Start Date</label>
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
{/* 2 rowwwwwwwwwwwwwwwwwwwwwwwwww*/}

            <div className="row  ">

              <div className="col-md-3 col-lg-3 col-sm-3 ">
                <div className="form-group">
                  <label htmlFor="skilltype">Type</label>
                  <select
                    className="form-control"
                    id="skillType"
                    name="skillType"
                    defaultValue={this.state.skillType.value}
                    onBlur={this.inputChange}
                    onClick={this.selectSkillType}
                  >
                    <option value="">Select</option>
                    <option value="1">Technical</option>
                    <option value="2">Product</option>
                  </select>
                </div>
                <InputErrors errors={this.state.skillType.errors} />
              </div>

              <div className="col-md-3 col-lg-3 col-sm-3  ">
                <div className="form-group">
                  <label htmlFor="skilltype">Skill</label>

                  <select
                    className="form-control"
                    id="skill"
                    name="skill"
                    defaultValue={this.state.skill.value}
                    onBlur={this.inputChange}
                  >
                    <option value="">Select</option>
                    {this.state.skills.map(skill => (
                      <option value={skill.id}>{skill.name}</option>
                    ))}
                  </select>
                </div>
                <InputErrors errors={this.state.skill.errors} />
              </div>



                   <div className="col-md-3 col-lg-3 col-sm-3 ">
                <div className="form-group">
                  <label htmlFor="skilltype">Level</label>
                  <select
                    className="form-control"
                    id="levelid"
                    name="level"
                    defaultValue={this.state.level.value}
                    onBlur={this.inputChange}
                    onClick={this.selectSkillType}
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
                  <label htmlFor="skilltype">Add</label>
                  <button
                    className="btn btn-info btn-block"
                    onClick={this.addskill}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className=" ">
                <table>
                  <thead>
                    <tr>
                      <th>Selected Skills</th>
                    </tr>
                  </thead>
                  <tbody >
                    <div className="d-flex flex-wrap">
                    {this.state.requiredSkills.length ? (
                      this.state.requiredSkills.map(el => (
                        <tr>
                          <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                          >
                            <strong>{el.skillr.name}: {el.level}</strong>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="alert"
                              aria-label="Close"
                              onClick={e => this.removeSkill(el.id)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                        </tr>
                      ))
                    ) : (
                      <tr>Not yet selected</tr>
                    )}
                    </div>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="col-md-12">
                <button type="submit" className="btn btn-info btn-block">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div style={{ height: "300px" }}></div>
      </>
    );
  }
}
