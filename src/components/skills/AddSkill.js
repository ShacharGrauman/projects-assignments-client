import React from "react";
import { GoogleCharts } from "google-charts";
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from "constants";

const id = "id";
const level = "level";
const date = "date";
const skillName = "name";

const Error = ({ e }) => {
  return e.map((eerr, index) => (
    <div
      className="alert alert-danger"
      role="alert"
      style={{ marginTop: "5px" }}
      key={index}
    >
      {eerr}
    </div>
  ));
};

class AddSkill extends React.Component {
  constructor() {
    super();
    this.state = {
      suggestions: null,
      [skillName]: {
        value: "",
        errors: [],
        validations: {
          required: true,
          /**pattern: /^[a-z0-9]+$/i,*/ exists: true
        },
        valid: true
      },
      /* [date]: {
        value: "",
        errors: [],
        validations: {
          required: true,
          minYear: 2009,
          maxYea: new Date().getFullYear()
        },
        valid: true
      },*/
      [level]: {
        value: "",
        errors: [],
        validations: { required: true, maxLevel: 5, minLevel: 1 },
        valid: true
      },

      type: {
        value: "TECHNICAL",
        errors: [],
        validations: { required: true },
        valid: true
      }
    };
    this.trySubmit = this.trySubmit.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.setType = this.setType.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  inputChanged(e) {
    const { value, name } = e.target;
    const { validations } = this.state[name];

    const errors = [];
    let valid = true;

    if (validations.required) {
      if (!value) {
        errors.push(`${name} is required`);
        valid = false;
      }
    }

    /*if (validations.exists) {
      if (
        !this.props.technical.find(skill => skill.skillName === value) &&
        !this.props.product.find(skill => skill.skillName === value)
      ) {
        errors.push(`${name} does no exist`);
        valid = false;
      }
    }*/

    if (validations.maxLevel) {
      if (value > validations.maxLevel) {
        errors.push(`${name} should be at most ${validations.maxLevel}`);
        valid = false;
      }
    }

    if (validations.minLevel) {
      if (value < validations.minLevel) {
        errors.push(`${name} should be at least ${validations.minLevel}`);
        valid = false;
      }
    }

    if (validations.maxYear) {
      if (new Date(value).getFullYear() > validations.maxYear) {
        errors.push(`${name} must not be later than ${value}`);
        valid = false;
      }
    }

    if (validations.minYear) {
      if (new Date(value).getFullYear() < validations.minYear) {
        errors.push(
          `${name} must not be earlier than year  ${validations.minYear}`
        );
        valid = false;
      }
    }

    /*if (validations.pattern) {
      if (!validations.pattern.test(value)) {
        errors.push(`invalid ${name}`);
        valid = false;
      }
    }*/

    this.setState({
      [name]: {
        ...this.state[name],
        value: value,
        errors,
        valid
      },
      suggestions: null
    });
  }

  trySubmit(e) {
    let isValid = true;

    for (const key in this.state) {
      if (this.state[key]) {
        this.inputChanged({
          target: {
            value: this.state[key].value,
            name: key
          }
        });
        if (!this.state[key].valid) {
          isValid = false;
        }
      }
    }

    if (isValid) {
      let skill = [...this.props.product, ...this.props.technical].filter(
        s => s.skillName === this.state.name.value
      );

      if (skill.length === 0) {
        skill = [{ skillId: null }];
      }

      this.props.submitNewSkill.call(
        this,
        skill[0].skillId,
        this.state.name.value,
        this.state.level.value,
        //   this.state.date.value,
        this.state.type.value
      );

      this.props.close();
    }
  }

  setType(e) {
    this.setState({
      type: {
        value: e.target.innerHTML,
        errors: [],
        validations: { required: true },
        valid: true
      }
    });
  }

  getSuggestions(e) {
    /* else {
      const arr = this.props.product.filter(s =>
        s.skillName.startsWith(e.target.value)
      );
      const arr2 = this.props.technical.filter(s =>
        s.skillName.startsWith(e.target.value)
      );

      this.setState({ suggestions: [...arr, ...arr2] });*/
    if (e.target.value === "") {
      this.setState({ suggestions: null });
    }

    const arr = this.props[this.state.type.value.toLowerCase()].filter(s =>
      s.skillName.startsWith(e.target.value)
    );
    this.setState({ suggestions: arr });
  }

  render() {
    return (
      <>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">
              Skill Name
            </span>
          </div>
          <input
            type="text"
            autoComplete="off"
            className="form-control"
            name={skillName}
            onBlur={this.inputChanged}
            onChange={this.getSuggestions}
          />

          {this.state.suggestions ? (
            <ul className="dropdown-menu" style={{ display: "inline-block" }}>
              {this.state.suggestions.map((e, index) => (
                <li key={index} className="dropdown-item">
                  {e.skillName}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}

          <div className="input-group-append"></div>
          <div className="input-group-append">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                Type
              </span>
            </div>
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.state.type.value}
            </button>
            <div className="dropdown-menu">
              <option className="dropdown-item" href="#" onClick={this.setType}>
                TECHNICAL
              </option>
              <option className="dropdown-item" href="#" onClick={this.setType}>
                PRODUCT
              </option>
            </div>
          </div>
        </div>
        <Error e={this.state.name.errors} />
        {/**<div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">
              Date
            </span>
          </div>
          <input
            type="date"
            className="form-control"
            name={date}
            aria-describedby="basic-addon3"
            onBlur={this.inputChanged}
          />
        </div>
        <Error e={this.state.date.errors} /> */}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">
              Level
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            name={level}
            min={this.state.level.validations.minLevel}
            max={this.state.level.validations.maxLevel}
            aria-describedby="basic-addon3"
            onBlur={this.inputChanged}
          />
        </div>
        <Error e={this.state.level.errors} />
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={this.trySubmit}
        >
          Add Skill
        </button>
      </>
    );
  }
}

export default AddSkill;
