import React from 'react';
import { api } from '../../mock-data/api';


export default class Roles extends React.Component {

    constructor() {
        super();
        this.state = {
            roles: []
        }
    }


    async componentDidMount() {
        api.getRoles

        const roles = await api.getRolesWithPermissions();
        this.setState({ roles });
        console.log(this.state.roles);
    }

    render() {
        return (
            <>
                <div className="m-3">
                    <div className="text-center">
                        <h5>Section Roles</h5>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-2 col-sm-2 mt-2">
                            <div className="nav flex-column nav-pills text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {this.state.roles.map((role,i) => <a key={i} className="nav-link" id={`v-pills-${role.role.id}-tab`} data-toggle="pill" href={`#v-pills-${role.role.id}`} role="tab" aria-controls={`v-pills-${role.role.id}`} aria-selected="false">{role.role.name}</a>)}
                                {/* <a className="nav-link active" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-admin" role="tab" aria-controls="v-pills-admin" aria-selected="true">Admin</a>
                                    <a className="nav-link" id="v-pills-employee-tab" data-toggle="pill" href="#v-pills-employee" role="tab" aria-controls="v-pills-employee" aria-selected="false">Employee</a>
                                    <a className="nav-link" id="v-pills-manager-tab" data-toggle="pill" href="#v-pills-manager" role="tab" aria-controls="v-pills-manager" aria-selected="false">Manager</a>
                                    <a className="nav-link" id="v-pills-hrManager-tab" data-toggle="pill" href="#v-pills-hrManager" role="tab" aria-controls="v-pills-manager" aria-selected="false">HR Manager</a>
                                    <a className="nav-link" id="v-pills-intern-tab" data-toggle="pill" href="#v-pills-intern" role="tab" aria-controls="v-pills-manager" aria-selected="false">Intern</a> */}
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-10 px-4">
                            <div className="tab-content" id="v-pills-tabContent">
                                {
                                    this.state.roles.map((role,i) => <div key={i} className="mt-3 tab-pane fade"
                                        id={`v-pills-${role.role.id}`}
                                        role="tabpanel"
                                        aria-labelledby={`v-pills-${role.role.id}-tab`}>{role.role.description}
                                        
                                        <h5 className="mt-3">Role permissions:</h5>
                                        <ul className="list-group">
                                            {role.permissions.map((permission,i)=>
                                                <li key={i} className="list-group-item">{permission.name}</li>
                                                )}
                                        </ul>
                                    </div>)
                                }

                                {/* <div 
                                            className="mt-3 tab-pane fade" 
                                            id="v-pills-employee" 
                                            role="tabpanel" 
                                            aria-labelledby="v-pills-employee-tab">
                                        "Employee job descriptions are written statements that describe the duties, responsibilities, required qualifications and reporting relationships of a particular job. ... Effectively developed, employee job descriptions are communication tools that are significant to your organization's success."
                                    </div>
                                    <div 
                                            className="mt-3 tab-pane fade" 
                                            id="v-pills-manager" 
                                            role="tabpanel" 
                                            aria-labelledby="v-pills-manager-tab">
                                        "Managers are the people in charge of employees and the facilities they work for. As a manager, your job is to plan and promote the daily schedule of employees and the business, interview, hire, and coordinate employees, create and maintain budgets, and coordinate with and report to senior management in the company."
                                    </div>
                                    <div 
                                            className="mt-3 tab-pane fade" 
                                            id="v-pills-hrManager" 
                                            role="tabpanel" 
                                            aria-labelledby="v-pills-hrManager-tab">
                                        "Human resource managers are the overseers of the human resources department and insurers of the functions and tasks being carried out by the HR team. They are often seen as the link between an organization’s management and its employees, as their work runs the gamut from providing consultation on strategic planning with top executives to recruiting, interviewing, and hiring new staff."
                                    </div>
                                    <div 
                                            className="mt-3 tab-pane fade" 
                                            id="v-pills-intern" 
                                            role="tabpanel" 
                                            aria-labelledby="v-pills-intern-tab">
                                        "an advanced student or graduate usually in a professional field (such as medicine or teaching) gaining supervised practical experience (as in a hospital or classroom)"
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}