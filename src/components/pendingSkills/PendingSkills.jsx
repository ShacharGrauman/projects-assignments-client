import React, { Component } from 'react';
import DataService from './service/PendingSkillsDataService';
import { BrowserRouter as Router,Link, Route, Switch } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PendingSkills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SkillsReq: [],
      managerId : this.props.match.params.managerId,
    }

    this.refreshList=this.refreshList.bind(this)
    this.confirmApprove=this.confirmApprove.bind(this)
    this.confirmReject=this.confirmReject.bind(this)
  }
  

  componentDidMount(){
      this.refreshList()
  }


  refreshList()
  {
    DataService.retrieveRequestedSkillsConfirmation(this.state.managerId).then(
      response => {
          this.setState({ SkillsReq: response.data})
      })
  }
 
  confirmApprove(e){
   let targetId=e.target.id
  confirmAlert({
    title: 'Confirm to submit',
    message: 'Are you sure, you want to confirm this skill!',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          let comm=document.getElementById("comment"+targetId).value
          let skill={
            id:targetId,
            managerId:this.state.managerId,
            comment:comm,
            status: "APPROVED"
          }
      
          DataService.approveSkill(skill)
          .then( (response)=>{
            if(response.data.status=="APPROVED"){
              let row = document.getElementById(targetId);
              row.parentNode.removeChild(row);
              toast.success("The skill is Added to the approved skills.");
              //window.alert("The skill is Added to the Approved Skills")
            }
            else{
              toast.error("Adding this skill is currently not possible");
              //window.alert("Adding this skill is currently not possible")
            }
          }    
          ) 
      
      


        }
      },
      {
        label: 'No',
        onClick: () => false
      }
    ]
  })
}

  
confirmReject(e){
  let targetId=e.target.id
 confirmAlert({
   title: 'Confirm to decline',
   message: 'Are you sure, you want to decline this request!',
   buttons: [
     {
       label: 'Yes',
       onClick: () => {
       let comm=document.getElementById("comment"+targetId).value
       let skill={
         id:targetId,
       }
   
       DataService.rejectReguestedSkill(skill.id)
       .then( (response)=>{
         if(response.data==true){
          let row = document.getElementById(targetId);
           row.parentNode.removeChild(row);
           toast.error("Request is rejected successfully!");
           //window.alert("Request is rejected successfully!")
         }
         else{
          toast.error("An error is occured, please try again later");
           //window.alert("An error is occured, please try again later")
         }

       }    
       ) 
      }

     },
     {
       label: 'No',
       onClick: () => false
     }
   ]
 })
}


  
  render() {
    return (
      
      <div class="container">
         <ToastContainer />

        <div class="row">
          <div class="col">
            <div class="card">

              <div class="card-body">


                <div class="row">
                  <div class="col-12">
                    <ul class="nav nav-tabs mb-4" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="technicalSkills-tab" data-toggle="tab" href="#technicalSkills" role="tab" aria-selected="true">Required Technical Skills confirmations</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="productSkills-tab" data-toggle="tab" href="#productSkills" role="tab" aria-selected="false">Required Product Skills confirmations</a>
                      </li>
                    </ul>
                    <div class="tab-content ml-1" id="myTabContent">
                      <div class="tab-pane fade show active" id="technicalSkills" role="tabpanel" aria-labelledby="technicalSkills-tab">


                        <table class="table table-hover table-sm">
                          <thead class="thead-dark">
                            <tr>
                              <th>Employee Name</th>
                              <th>Skill Name</th>
                              
                              <th>Request Date</th>

                              <th>Grade</th>
                              <th>Comment</th>
                              <th>Reject/Approve</th>
                            </tr>
                          </thead>
                          <tbody id="technicalReq">
                            {

                              this.state.SkillsReq.filter(skill=> skill.type=="TECHNICAL").map(
                                request =>    
                                  <tr key={request.employeeSkillId} id={request.employeeSkillId}>
                                    
                                    <td>{request.employeeName}</td>
                                    <td>{request.skillName}</td>
                                    <td>{request.date}</td>
                                    <td>{request.level}</td>
                                    <td><input type="text" id={"comment"+request.employeeSkillId}></input></td>
                                    <td><button class="btn btn-danger btn-sm" id={request.employeeSkillId} onClick={this.confirmReject}> Reject </button>&nbsp;
                                    <button class="btn btn-success btn-sm" id={request.employeeSkillId} onClick={this.confirmApprove}>Approve</button></td>
                                  </tr>

                              )
                            }




                          </tbody>
                        </table>

                      </div>
                      <div class="tab-pane fade" id="productSkills" role="tabpanel" aria-labelledby="productSkills-tab">
                        <div id="tableContainer" class="mx-auto">

                          <table class="table table-hover table-sm">
                            <thead class="thead-dark">
                              <tr>
                                <th>Employee Name</th>
                                <th>Skill Name</th>
                                <th>Request Date</th>

                                <th>Grade</th>
                                <th>Comment</th>
                                <th>Reject/Approve</th>
                              </tr>
                            </thead>
                            <tbody id="productReq">


                              {

                                this.state.SkillsReq.filter(skill=>skill.type=="PRODUCT").map(
                                  request =>

                                   <tr key={request.employeeSkillId} id={request.employeeSkillId}>
                                      <td>{request.employeeName}</td>
                                      <td>{request.skillName}</td>
                                      <td>{request.date}</td>
                                      <td>{request.level}</td>
                                      <td><input type="text" id={"comment"+request.employeeSkillId}></input></td>
                                      <td><button class="btn btn-danger btn-sm" id={request.employeeSkillId} onClick={this.confirmReject}> Reject </button>&nbsp;
                                          <button class="btn btn-success btn-sm" id={request.employeeSkillId} onClick={this.confirmApprove}>Approve</button></td>
                                    </tr>

                                )
                              }

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              </div>
            </div>
          </div>
        </div>



      </div>
    )
  }
}
export default PendingSkills






