import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import InputErrors from '../shared-components/InputErrors'
import { Link, BrowserRouter } from 'react-router-dom';
import {toast} from 'react-toastify'


import {api} from '../../mock-data/api'

export default class ForgotPasswordModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', errors: [], validations: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ } },
            employeeNumber: { value: '', errors: [], validations: { required: true } }
        }
        this.ForgotPasswordSubmit = this.ForgotPasswordSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleRequiredValidation(name, value) {
        if (!value) {
            return `*${name} is required`;
        }
    }

    handlePatternValidation(name, value, pattern) {
        if (pattern) {
            if (!pattern.test(value)) {
                return `*invalid ${name}`;
            }
        }
    }
    handleInputChange({ target: { name, value } }) {
        const { validations } = this.state[name];
        const errors = [];

        {/** required input validation */ }
        if (validations.required) {
            errors.push(this.handleRequiredValidation(name, value));
        }
        {/** Valid email input */ }
        errors.push(this.handlePatternValidation(name, value, validations.pattern))
        {/** Update the state with the errors if exist*/ }
        this.setState({
            [name]: {
                ...this.state[name],
                value: value,
                errors
            }
        });
    }

    ForgotPasswordSubmit(e) {
        let errors;
        // Test each field of the form for errors
        Object.keys(this.state).forEach(name => {
            const { [name]: input } = this.state
            if (this.handleRequiredValidation(name, input.value) ||
                this.handlePatternValidation(name, input.value, input.validations.pattern)) {
                errors = true
            }
        })
        if (!errors) {
            const finalResult = {
                email: this.state.email,
                employeeNumber: this.state.employeeNumber
            }

            console.log(finalResult)

            const passwordResetRes=api.resetPassword(finalResult);
            console.log(passwordResetRes)

            toast.success("A new password was sents to your mail");
        }
        else{
            toast.error("Please insert valid credentials")
        }
    }

    render() {
        return (
            <div>
                <div className="modal fade" tabIndex="-1" id="ForgotPasswordModal" role="dialog" aria-labelledby="ForgotPasswordModalLabel" aria-hidden="true">
                    <div style={{ height: 'auto' }} className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="headerModalLabel">Reset Your Password</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <FontAwesomeIcon icon={faUserCircle} ></FontAwesomeIcon>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        id="input__email__forgot_password"
                                        aria-label="email"
                                        name="email"
                                        defaultValue={this.state.email.value}
                                        onBlur={this.handleInputChange} ></input>
                                </div>
                                <InputErrors errors={this.state.email.errors} />
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <FontAwesomeIcon icon={faBarcode} ></FontAwesomeIcon>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Employee Number"
                                        id="input__employeeNumber"
                                        aria-label="employeeNumber"
                                        name="employeeNumber"
                                        defaultValue={this.state.employeeNumber.value}
                                        onBlur={this.handleInputChange} ></input>
                                </div>
                            </div>
                            <InputErrors errors={this.state.employeeNumber.errors} />
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={this.ForgotPasswordSubmit} className="btn btn-primary" data-dismiss="modal">Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
