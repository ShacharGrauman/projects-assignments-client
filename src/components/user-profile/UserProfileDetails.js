import React from 'react';
import {DataContext} from '../common/Provider/DataProvider'

export default class UserProfileDetails extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(<>

                          
                    <div className="card mb-2">
                        <h5 className="text-center mt-3 mb-1">Details</h5>
        
                        <div className="card-body">

                        <div className="row mt-0">
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <small className="mb-1">First Name</small>
                                <input type="text" className="form-control" placeholder="First Name" aria-label="FirstName"
                                    disabled={this.props.editMode} defaultValue={this.props.details.firstName}></input>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <small className="mb-1">Last Name</small>
                                <input type="text" className="form-control input_lastName" placeholder="Last Name" aria-label="LastName"
                                    disabled={this.props.editMode} defaultValue={this.props.details.lastName}></input>
                            </div>

                            <div className="col-lg-3 col-sm-6 mb-2">
                                <small className="mb-1">Manager</small>
                                <input 
                                    id="link__Manager"
                                    className="form-control input_manager" 
                                    disabled={this.props.editMode}
                                    placeholder="Manager"
                                    defaultValue={this.props.details.manager.name}
                                    list="managers"></input>
                                <datalist id="managers">
                                    <option value="Shahar Grauman, 33"/>
                                    <option value="Ezer Biron, 42"/>
                                    <option value="Walaa"/>
                                    <option value="Amani"/>
                                    <option value="Yasmin"/>
                                </datalist>
                            </div>

{this.props.editMode?

                            <div className="col-lg-3 col-sm-6 mb-2">
                                <small className="mb-1">Last Login</small>
                                <input type="text" className="form-control input_lastLogin" aria-label="LastLogin"
                                    disabled defaultValue={this.props.details.lastLogin}></input>
                            </div>
                            :
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <small className="mb-1">Emp. No.</small>
                                <input type="text" className="form-control input_employeeNumber" placeholder="Emp. No." aria-label="EmployeeNumber"
                                    disabled={this.props.editMode} defaultValue={this.props.details.id}></input>
                            </div>

}
                            <div className="col-lg-3 col-sm-6 mb-2">
                                <small className="mb-1">Phone</small>
                                <input type="text" className="form-control input_phone" placeholder="Phone" aria-label="Phone"
                                    disabled={this.props.editMode} defaultValue={this.props.details.phone}></input>
                            </div>

                            <div className="col-lg-3 col-sm-6 mb-2">
                                <small className="mb-1">Email</small>
                                <input type="email" className="form-control input_email" placeholder="email" aria-label="Email"
                                    disabled={this.props.editMode} defaultValue={this.props.details.email}></input>
                            </div>

                            <div className="col-lg-3 col-sm-6 mb-2">
                                <small className="mb-1">Department</small>
                                <input 
                                    id="link__department"
                                    className="form-control department" 
                                    disabled={this.props.editMode}
                                    placeholder="Department"
                                    defaultValue={this.props.details.department.name}
                                    list="department"></input>
                                <datalist id="department">
                                    <DataContext.Consumer>
                                        {(context)=>context.departments.map(dep=> <option key={dep.id} value={dep.name}/>)}
                                    </DataContext.Consumer>
                                </datalist>
                            </div>

                            <div className="col-lg-3 col-sm-6 mb-2">
                                 <small className="mb-1">Work Site</small>
                                 
                                 <input 
                                    id="link__WorkSite"
                                    className="form-control worksite" 
                                    disabled={this.props.editMode}
                                    placeholder="Work site"
                                    defaultValue={this.props.details.workSite.name}
                                    list="worksite"></input>
                                <datalist id="worksite">
                                    <DataContext.Consumer>
                                        {(context)=>
                                            context.worksites.map(worksite=>{
                                                let value = `${worksite.name || worksite}, ${worksite.country}`;
                                                return <option key={worksite.id} value={value}/>
                                            }
                                        )}
                                    </DataContext.Consumer>
                                </datalist>
                            </div>
                        </div>
                    </div>
                </div>
                
        </>)
    }
}