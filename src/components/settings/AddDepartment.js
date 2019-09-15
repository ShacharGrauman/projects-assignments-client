import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfo, faBuilding } from '@fortawesome/free-solid-svg-icons';

import InputErrors from '../shared-components/InputErrors'

export default class AddDepartment extends Component {
    constructor(){
        super();
        this.state = {
            department:  {value:'', errors:[], validations: {required: true}},
            description: {value:'', errors:[], validations: {required: true}},
        }

        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    inputChange({ target: { name, value }}){
        const { validations } = this.state[name];
        const errors = [];

        if(validations.required){
            if(!value){
                errors.push(`${name} is required`);                
            }    
        }

        if(validations.minLength){
            if(value.length < validations.minLength){
            }
        }
        if(validations.pattern){
            if(!validations.pattern.test(value)){
                errors.push(`invalid ${name}`);
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

    submit(e){
        for(const key in this.state){
            this.inputChange({target: {value: this.state[key].value, name: key}});
        }
        e.preventDefault();
    }

    render() {
        return (
            
            <div className="">
                <h4 className="alert-heading text-center mx-auto mb-3">Department</h4>
                
                
                {/*Department name*/}
                <form onSubmit={this.submit}>
                    <div className="mx-auto mb-3 col-md-6">
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
                                    name="deprtment"
                                    defaultValue={this.state.department.value}
                                    onBlur={this.inputChange}
                                ></input>
                            </div>
                            <InputErrors errors={this.state.department.errors} />                                                        
                        </div>
                        
                    </div>   



                    {/* Description                 
                    <div className="mx-auto mb-3 col-md-6">
                        <div className="">
                            <label htmlFor="departmentDescription">Description</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon={faInfo}></FontAwesomeIcon>
                                    </span>
                                </div>
                                <textarea className="form-control" placeholder="Department description" aria-label="With textarea"
                                    id="description"
                                    name="description"
                                    defaultValue={this.state.description.value}
                                    onBlur={this.inputChange}
                                ></textarea>
                            </div>
                            <InputErrors errors={this.state.description.errors} />
                        </div>
                    </div> */}
                    <div className="row  mb-3">
                    

                    {/* Save & Cancel */}
                    </div>
                    <div className="mx-auto d-flex justify-content-between col-md-6">
                        <button type="button" className="m-2 col-md-2 btn btn-danger">Cancel</button>
                        <button type="button" className="m-2 col-md-2 btn btn-success">Add</button>
                    </div>
                    
                </form>
            </div>            
        );
    }
}