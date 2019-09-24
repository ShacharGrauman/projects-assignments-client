import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faBuilding } from '@fortawesome/free-solid-svg-icons';
import {DataProvider} from '../common/Provider/DataProvider';
import {DataContext} from '../common/Provider/DataProvider'
import {toast} from 'react-toastify'
import InputErrors from '../shared-components/InputErrors'

import {api} from '../../mock-data/api'

export default class AddDepartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            department: { value: '', errors: [], validations: { required: true } }
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
                department: this.state.department,
            }
            const result = api.addDepartment(finalResult)
            result.then(res=>{
                if(res.ok){
                    toast.success("Adding new department succeeded")
                }
                else{
                    toast.error('Failed to add department')
                }
            })
        }
        else {
            toast.error("Please fill the missing")
        }
    }

    render() {
        return (<>
        <div className="d-flex  justify-content-around">
            <div>
            <h5 className="alert-heading text-center mx-auto mb-3">Department</h5>
                <form onSubmit={this.submit}>
                    <div className="">
                    
                        {/*Department name*/}
                        <div className="mx-auto mb-3">
                            <div className="">
                                <label htmlFor="addDepartment">Name</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Department name" aria-label="department" aria-describedby="basic-addon1"
                                        id="department"
                                        name="department"
                                        defaultValue={this.state.department.value}
                                        onChange={this.inputChange}
                                    ></input>
                                </div>
                                <InputErrors errors={this.state.department.errors} />
                            </div>
                        </div>
                        <div className="mx-auto d-flex justify-content-between">
                            <button 
                            type="submit" 
                            className="m-2 btn btn-success btn-block"
                            disabled={this.state.department.value===""}>Add</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <ul className="list-group">
                    <DataProvider>
                        <DataContext.Consumer>
                            {({departments})=>departments.map((department,i)=> <li key={i} className="list-group-item">{department.name}</li>)}
                        </DataContext.Consumer>
                    </DataProvider>

                </ul>
            </div>

            </div>
                

                </>

        );
    }
}