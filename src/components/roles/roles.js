import React from 'react';


export default class Roles extends React.Component{


    render(){
            return (
                <>
                <div className="m-3">
                    <div className="text-center">
                        <h5>Section Roles</h5>
                    </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-2 col-sm-2 mt-2">
                                <div className="nav flex-column nav-pills text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a className="nav-link active" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-admin" role="tab" aria-controls="v-pills-admin" aria-selected="true">Admin</a>
                                    <a className="nav-link" id="v-pills-employee-tab" data-toggle="pill" href="#v-pills-employee" role="tab" aria-controls="v-pills-employee" aria-selected="false">Employee</a>
                                    <a className="nav-link" id="v-pills-manager-tab" data-toggle="pill" href="#v-pills-manager" role="tab" aria-controls="v-pills-manager" aria-selected="false">Manager</a>
                                    <a className="nav-link" id="v-pills-hrManager-tab" data-toggle="pill" href="#v-pills-hrManager" role="tab" aria-controls="v-pills-manager" aria-selected="false">HR Manager</a>
                                    <a className="nav-link" id="v-pills-intern-tab" data-toggle="pill" href="#v-pills-intern" role="tab" aria-controls="v-pills-manager" aria-selected="false">Intern</a>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-10 px-4">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="mt-3 tab-pane fade show active" 
                                            id="v-pills-admin" 
                                            role="tabpanel" 
                                            aria-labelledby="v-pills-admin-tab">
                                        "An Administrator provides office and administrative support to either a team or individual. This role is vital for the smooth-running of a business. Duties may include fielding telephone calls, receiving and directing visitors, word processing, creating spreadsheets and presentations, and filing."
                                    </div>
                                    <div 
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
        )
    }
}