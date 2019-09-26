import React from "react";
import { DataContext } from "../common/Provider/DataProvider";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InputErrors from "../shared-components/InputErrors";
import Loading from "../common/loading";
export default class UserProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleInputChange({ target: { name, value } }) {
    let dataSet = [];
    let keyValue = "";
    if (name === "manager") {
      dataSet = this.context.data.data.managers;
      const _number = value.split(",")[1];
      keyValue = dataSet.find(e => e.number == _number).id;
    } else if (name === "workSite") {
      dataSet = this.context.data.data.worksites;
      keyValue = dataSet.find(e => e.name === value).id;
      await this.props.handleInputChange({
        target: {
          name: "country",
          value: dataSet.find(e => e.id == keyValue).country.name
        }
      });
    }
    this.props.handleInputChange({ target: { name, value: keyValue } });
  }
  componentDidMount() {

  }
  render() {
    let {
      data: {
        data: { departments }
      }
    } = this.context;
    return(
      <div>
        <div className="card mb-2">
          <h5 className="text-center mt-3 mb-1">Details</h5>

          <div className="card-body">
            <div className="row mt-0">
              <div className="col-lg-3 col-sm-6 mb-2">
                <small className="mb-1">First Name</small>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  aria-label="FirstName"
                  name="firstName"
                  disabled={this.props.editMode}
                  onBlur={this.props.handleInputChange}
                  defaultValue={this.props.details.firstName.value}
                ></input>
                <InputErrors errors={this.props.details.firstName.errors} />
              </div>

              <div className="col-lg-3 col-sm-6 mb-2">
                <small className="mb-1">Last Name</small>
                <input
                  type="text"
                  className="form-control input_lastName"
                  placeholder="Last Name"
                  aria-label="LastName"
                  name="lastName"
                  disabled={this.props.editMode}
                  onBlur={this.props.handleInputChange}
                  defaultValue={this.props.details.lastName.value}
                ></input>
                <InputErrors errors={this.props.details.lastName.errors} />
              </div>

              <div className="col-lg-3 col-sm-6 mb-2">
                <small className="mb-1">Manager</small>
                <input
                  id="link__Manager"
                  className="form-control input_manager"
                  disabled={this.props.editMode}
                  placeholder="Manager"
                  onChange={this.handleInputChange}
                  defaultValue={this.props.details.managerName.value}
                  name="manager"
                  list="managers"
                />{" "}
                <datalist id="managers">
                  <DataContext.Consumer>
                    {({
                      data: {
                        data: { managers }
                      }
                    }) =>
                      managers.map(mgr => {
                        let name = `${mgr.firstName} ${mgr.lastName} ,${mgr.number}`;
                        return (
                          <option key={mgr.id} value={name} data-value="heyy" />
                        );
                      })
                    }
                  </DataContext.Consumer>
                </datalist>
                <InputErrors errors={this.props.details.managerName.errors} />
              </div>

              {this.props.addUserForm ? (
                <div className="col-lg-3 col-sm-6 mb-2">
                  <small className="mb-1">Emp. No.</small>
                  <input
                    type="text"
                    className="form-control input_employeeNumber"
                    placeholder="Emp. No."
                    aria-label="EmployeeNumber"
                    name="employeeNumber"
                    disabled={this.props.editMode}
                    onBlur={this.props.handleInputChange}
                    defaultValue={this.props.details.employeeNumber.value}
                  ></input>
                  <InputErrors
                    errors={this.props.details.employeeNumber.errors}
                  />
                </div>
              ) : (
                <div className="col-lg-3 col-sm-6 mb-2">
                  <small className="mb-1">Last Login</small>
                  <input
                    type="text"
                    className="form-control input_lastLogin"
                    aria-label="LastLogin"
                    disabled
                    defaultValue={this.props.details.lastLogin}
                  ></input>
                </div>
              )}
              <div className="col-lg-3 col-sm-6 mb-2">
                <small className="mb-1">Phone</small>
                <input
                  type="text"
                  className="form-control input_phone"
                  placeholder="Phone"
                  aria-label="Phone"
                  name="phone"
                  onBlur={this.props.handleInputChange}
                  disabled={this.props.editMode}
                  defaultValue={this.props.details.phone.value}
                ></input>
                <InputErrors errors={this.props.details.phone.errors} />
              </div>

              <div className="col-lg-3 col-sm-6 mb-2">
                <small className="mb-1">Email</small>
                <input
                  type="email"
                  className="form-control input_email"
                  placeholder="email"
                  aria-label="Email"
                  name="email"
                  disabled={this.props.editMode}
                  onBlur={this.props.handleInputChange}
                  defaultValue={this.props.details.email.value}
                ></input>
                <InputErrors errors={this.props.details.email.errors} />
              </div>

              <div className="col-lg-3 col-sm-6 mb-2">
                <small className="mb-1">Department</small>
                <input
                  id="link__department"
                  className="form-control department"
                  disabled={this.props.editMode}
                  placeholder="Department"
                  onChange={this.props.handleInputChange}
                  defaultValue={this.props.details.department.value}
                  name="department"
                  list="department"
                ></input>
                <datalist id="department">
                  {departments.map((dep, i) => (
                    <option key={i} value={dep.name} />
                  ))}
                </datalist>
                <InputErrors errors={this.props.details.department.errors} />
              </div>

              <div className="col-lg-3 col-sm-6 mb-2">
                <small className="mb-1">Work Site</small>
                <input
                  id="link__WorkSite"
                  className="form-control worksite"
                  disabled={this.props.editMode}
                  placeholder="Work site"
                  onChange={this.handleInputChange}
                  defaultValue={this.props.details.workSite.value}
                  name="workSite"
                  list="worksite"
                ></input>
                <datalist id="worksite">
                  <DataContext.Consumer>
                    {({
                      data: {
                        data: { worksites }
                      }
                    }) =>
                      worksites.map(worksite => {
                        return (
                          <option
                            key={worksite.id}
                            value={worksite.name}
                          ></option>
                        );
                      })
                    }
                  </DataContext.Consumer>
                </datalist>
                <InputErrors errors={this.props.details.workSite.errors} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserProfileDetails.contextType = DataContext;
