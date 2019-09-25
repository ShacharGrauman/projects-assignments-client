import React from 'react';
import InputErrors from '../shared-components/InputErrors'
import {api} from '../../mock-data/api'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBarcode, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Link, BrowserRouter } from 'react-router-dom';
import ForgotPasswordModal from './ForgotPasswordModel'
import { toast } from 'react-toastify';
import {DataContext} from '../common/Provider/DataProvider'

export class login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: { value: '', errors: [], validations: { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ } },
            password: { value: '', errors: [], validations: { required: true } }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this)
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


    async loginSubmit(e) {
        e.preventDefault();
        let errors;
        // Test each field of the form for errors
        Object.keys(this.state).forEach(name => {
            const { [name]: input } = this.state
            if (this.handleRequiredValidation(name, input.value) ||
                this.handlePatternValidation(name, input.value, input.validations.pattern)) {
                errors = true
            }
        })
        if(!errors){
            const resp = await api.validateLogin(this.state.email.value, this.state.password.value);

            if(resp.status && resp.status != 200){
                toast.error(resp.data.message);
                return;
            }

            const [,val2] = document.cookie.split("=")
                
            const [id, employeeNumber, email, roles] = window.atob(val2).split(';');
            const permissions = JSON.parse(roles);                

            const {initAuth} = this.context;
            initAuth(permissions[0], id, email);

            this.props.history.push('/users-list');
            // }else{
            //                 if(resp.status !== 200){
            //             toast.error(res.message);
            //         }

            
      }
      else{
        toast.error('Please insert valid credentials')
      }

            
    }

    render() {
        return (
            <div style={{ minHeight: "82vh" }} className="d-flex flex-lg-row-reverse align-items-lg-center flex-column">
                <div className="flex-grow-1">
                    <h3 className="text-center my-3" style={{ fontFamily: "Sans-Serif", letterSpacing: "2px" }}>
                        <img style={{ width: "29px" }} src="a_logo.png"></img>ssign Me
                    </h3>
                    <hr className="col-12 col-md-8"></hr>
                </div>

                {/* AVATAR */}
                <div className=" flex-grow-1 ">
                    <div className="rounded shadow pt-5 pb-2 pr-4 pl-4 mt-5 ml-auto mr-auto card col-10 col-sm-8 col-md-7">
                        <div className="d-flex justify-content-center">
                            <img className="position-absolute" src="avatar.jpg" style={{ width: "5rem", top: "-42px", border: "1px solid teal", borderRadius: "50%" }}></img>
                        </div>
                        {/* LOGIN FORM INPUT*/}
                        <form >
                            {/* Input Email */}
                            <div className="form-group mb-3">
                                <label className="mb-0" htmlFor="input__email">Email address</label>
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-at"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        id="input__email"
                                        aria-label="email"
                                        name="email"
                                        defaultValue={this.state.email.value}
                                        onBlur={this.handleInputChange} ></input>
                                </div>
                                <InputErrors errors={this.state.email.errors} />
                            </div>


                            {/* Input Password */}
                            <div className="form-group">
                                <label className="mb-0" htmlFor="input__password">Password</label>
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-unlock"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        id="input__password"
                                        name="password"
                                        onBlur={this.handleInputChange}
                                        aria-label="password"></input>
                                </div>
                                <InputErrors errors={this.state.password.errors} />

                                {/* Forgot ypur password? */}

                                <a className="btn btn nav-link text-left p-0 mb-3 mt-2" style={{ "color": "teal", cursor: 'pointer' }} data-toggle="modal" data-target="#ForgotPasswordModal">
                                    Forgot your password?
                                    </a>
                                {/* Calling for forgot password component*/}
                                <ForgotPasswordModal />

                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="button" onClick={this.loginSubmit} className="mr-2 mb-3 btn btn-info">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

login.contextType=DataContext

export default login
