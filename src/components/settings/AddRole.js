import React, { Component } from 'react'
import ListComponent from '../shared-components/List'
import InputErrors from '../shared-components/InputErrors'
import {toast} from 'react-toastify'
import {api} from '../../mock-data/api'

export default class AddRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs:{
                role: { value: '', errors: [], validations: { required: true } },
                description:{value:'', errors: [] ,validations: { required: false }}
            },
            selectedPermissions:[{name:'permission1', id:1},{name:'permission2', id:2}],
            non_selectedPermissions:[]
        }
        const allPermissions = [{name:'permission1', id:1},{name:'permission2', id:2},{name:'permission3', id:3},{name:'permission4', id:4},{name:'permission5', id:5}]
        this.inputChange = this.inputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.togglePermission = this.togglePermission.bind(this)
    }

    componentDidMount(){
        this.setState({
            non_selectedPermissions: [{name:'permission1', id:1},{name:'permission2', id:2},{name:'permission3', id:3},{name:'permission4', id:4},{name:'permission5', id:5}]
        })
    }

    inputChange({ target: { name, value } }) {
        const { validations } = this.state.inputs[name];
        const errors = [];

        if (validations.required) {
            {/** required input validation */ }
            if (validations.required) {
                errors.push(this.handleRequiredValidation(name, value));
            }
        }

        this.setState({
            inputs:{...this.state.inputs,
                [name]: {
                ...this.state.inputs[name],
                value: value,
                errors
                }
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
        Object.keys(this.state.inputs).forEach(name => {
            const { [name]: input } = this.state.inputs
            if (this.handleRequiredValidation(name, input.value)) {
                errors = true
            }
        })

        if (!errors) {
            const finalResult = {
                role: this.state.role,
            }
            const result = api.addRole({name:this.state.inputs.role.value,
                            description:this.state.inputs.description.value,
                            permissions:this.state.selectedPermissions})
                            console.log(result)
            if (result.Ok){
                toast.success("Successfully added new Role")
            }else{
                toast.error("Unable to add this role")
            }
        }
        else {
            toast.error("Please fill the missing")
        }
    }

    togglePermission(event){
        let permissionsSelected=[]
                //adding permissions to the selected permission, removing them from the non_selectedPermissions
        if(event.target.getAttribute('id')==='btn_add'){
            permissionsSelected = document.getElementById('_all_permissions')
            const permissionsToManipulate = [...permissionsSelected.options]
                            .filter(option=> option.selected)
                            .map(selected=>({id:+selected.id, name:selected.innerText}));
            this.setState({selectedPermissions:[...this.state.selectedPermissions, ...permissionsToManipulate]},
                ()=>{
                    this.setState({
                        non_selectedPermissions:this.allPermissions
                                .filter(el=>!this.state.selectedPermissions.find(({name})=>el.name===name))
                    })
                })

                //removing permissions from the selected permissions, adding them to the non_selected permissions
        }else if(event.target.getAttribute('id')==='btn_remove'){
           permissionsSelected = document.getElementById('_selected_permissions')
           const permissionsToManipulate = [...permissionsSelected.options]
                            .filter(option=> option.selected)
                            .map(selected=>({id:+selected.id, name:selected.innerText}));

            this.setState({
                selectedPermissions:this.state.selectedPermissions.filter(el=>!permissionsToManipulate.find(({name})=>el.name===name))
            },()=>{
                this.setState({
                    non_selectedPermissions:this.allPermissions.filter(el=>!this.state.selected.find(({name})=>el.name===name))
                })
            })

        }

    }

    render() {
        return (
            <>
                <form onSubmit={this.submit}>
                    <h5 className="text-center">Add New Role</h5>
                    <div className="m-auto col-sm-10">
                        <div className="col-lg-8 m-auto p-0">
                            <div className="mb-3">
                                <label htmlFor="RoleName" className="mb-0">Role Name</label>
                                    <div className="input-group">
                                        <input type="text"
                                            id="RoleName"
                                            name="role"
                                            className="form-control"
                                            placeholder="Role Name"
                                            aria-label="Role Name"
                                            aria-describedby="role_name"
                                            defaultValue={this.state.inputs.role.value}
                                            onBlur={this.inputChange}></input>
                                    </div>
                                    <InputErrors errors={this.state.inputs.role.errors} />
                            </div>
                            <div className="">
                                <label htmlFor="RoleName" className="mb-0">Role Description</label>
                                <div className="input-group">
                                    <textarea
                                        className="form-control"
                                        aria-label="With textarea"
                                        name="description"
                                        placeholder="Role Description"
                                        onBlur={this.inputChange}
                                        defaultValue={this.state.inputs.description.value}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="d-flex mt-3">
                                <div className="w-100 ">
                                    <ListComponent id="_all_permissions" title="All Permissions" options={this.state.non_selectedPermissions} />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <button type="button" className="btn btn-sm btn-outline-success m-1 mx-2" id="btn_add" onClick={this.togglePermission}>Add <i className="fas fa-arrow-right"></i></button>
                                    <button type="button" className="btn btn-sm btn-outline-danger m-1  mx-2" id="btn_remove" onClick={this.togglePermission}><i className="fas fa-arrow-left"></i> Remove</button>
                                </div>
                                <div className="w-100 ">
                                    <ListComponent id="_selected_permissions" title="Selected Permissions" options={this.state.selectedPermissions} />
                                </div>
                            </div>
                            <div className="">
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className=" btn btn-success ">Finish </button>
                                </div>
                            </div>

                        </div>

                    </div>

                </form>
            </>
        )
    }
}
