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
      [skillName]: {
        value: "",
        errors: [],
        validations: { required: true, pattern: /^[a-z0-9]+$/i },
        valid: true
      },
      [date]: {
        value: "",
        errors: [],
        validations: {
          required: true,
          minYear: 2009,
          maxYea: new Date().getFullYear()
        },
        valid: true
      },
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
  }

  inputChanged(e) {
    const { value, name } = e.target;
    const { validations } = this.state[name];

    console.log(name, validations);
    const errors = [];
    let valid = true;

    if (validations.required) {
      if (!value) {
        errors.push(`${name} is required`);
        valid = false;
      }
    }

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

    if (validations.pattern) {
      if (!validations.pattern.test(value)) {
        errors.push(`invalid ${name}`);
        valid = false;
      }
    }

    this.setState({
      [name]: {
        ...this.state[name],
        value: value,
        errors,
        valid
      }
    });
  }

  trySubmit(e) {
    let isValid = true;
    for (const key in this.state) {
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

    if (isValid) {
      this.props.submitNewSkill.call(
        this,
        this.state.name.value,
        this.state.date.value,
        this.state.level.value,
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

  render() {
    return (
      <scrollbars>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon3">
              Skill Name
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            name={skillName}
            onBlur={this.inputChanged}
          />
          <div className="input-group-append">
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
        <div className="input-group"></div>

        <div className="input-group mb-3">
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
        <Error e={this.state.date.errors} />

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
      </scrollbars>
    );
  }
}

export default AddSkill;
