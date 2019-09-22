import React, { Component } from 'react'
import ListComponent from '../shared-components/List'
import InputErrors from '../shared-components/InputErrors'
import {toast} from 'react-toastify'

export default class AddRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: { value: '', errors: [], validations: { required: true } }
        }
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    inputChange({ target: { name, value } }) {
        const { validations } = this.state[name];
        const errors = [];

        if (validations.required) {
            {/** required input validation */ }
            if (validations.required) {
                errors.push(this.handleRequiredValidation(name, value));
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
    handleRequiredValidation(name, value) {
        if (!value) {
            return `*${name} is required`;
        }
    }

    submit(e) {
        e.preventDefault();
        let errors;
        // Test field of the form for errors
        Object.keys(this.state).forEach(name => {
            const { [name]: input } = this.state
            if (this.handleRequiredValidation(name, input.value)) {
                errors = true
            }
        })

        if (!errors) {
            const finalResult = {
                role: this.state.role,
            }
            toast.success("Adding new department successed")
        }
        else {
            toast.error("Please fill the missing")
        }
    }

    render() {
        return (
            <>
                <form onSubmit={this.submit}>
                    <h5 className="text-center">Add New Role</h5>
                    <div className="m-auto col-sm-6">
                        <div className="col-lg-8 col-md-8 m-auto p-0">
                            <div className="row">
                                <label htmlFor="RoleName" className="mb-0">Role Name</label>
                                <div className="input-group mb-3">
                                    <input type="text"
                                        id="RoleName"
                                        name="role"
                                        className="form-control"
                                        placeholder="Role Name"
                                        aria-label="Role Name"
                                        aria-describedby="role_name"
                                        defaultValue={this.state.role.value}
                                        onBlur={this.inputChange}></input>
                                </div>
                                <InputErrors errors={this.state.role.errors} />
                            </div>
                            <div className="row">
                                <label htmlFor="RoleName" className="mb-0">Role Description</label>
                                <div className="input-group">
                                    <textarea
                                        className="form-control"
                                        aria-label="With textarea"
                                        placeholder="Role Description"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="w-100 ">
                                    <ListComponent options={['Permission 1', 'Permission 2', 'Permission 3']} />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-sm btn-outline-success m-1 mx-2">Add <i className="fas fa-arrow-right"></i></button>
                                    <button type="button" className="btn btn-sm btn-outline-danger m-1  mx-2"><i className="fas fa-arrow-left"></i> Remove</button>
                                </div>
                                <div className="w-100 ">
                                    <ListComponent options={['Permission 4', 'Permission 5']} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="d-flex flex-row justify-content-end">
                                    <button type="submit" className="btn btn-sm btn-success m-1 mx-2">Add </button>
                                    <button type="button" className="btn btn-sm btn-danger m-1  mx-2">cancel</button>
                                </div>
                            </div>

                        </div>

                    </div>

                </form>
            </>
        )
    }
}
