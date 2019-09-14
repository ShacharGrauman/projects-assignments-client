import React, { Component } from 'react'
import ListComponent from '../shared-components/List'


export default class AddRole extends Component {
    render(){
        return(<>

        <h5 className="text-center">Add New Role</h5>
        <div className="col-lg-8 col-md-8 m-auto p-0">
            <div className="row">
                <label htmlFor="RoleName" className="mb-0">Role Name</label>
                <div className="input-group mb-3">
                    <input type="text"
                    id="RoleName"
                    className="form-control"
                    placeholder="Role Name"
                    aria-label="Role Name"
                    aria-describedby="role_name"></input>
                </div>
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
                    <ListComponent options={['Permission 1','Permission 2','Permission 3']}/>
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <button className="btn btn-sm btn-outline-success m-1 mx-2">Add <i className="fas fa-arrow-right"></i></button>
                    <button className="btn btn-sm btn-outline-danger m-1  mx-2"><i className="fas fa-arrow-left"></i> Remove</button>
                </div>
                <div className="w-100 ">
                    <ListComponent options={['Permission 4','Permission 5']}/>
                </div>
            </div>

            </div>


            </>
        )
    }
}
