import React from "react";
import { Link } from "react-router-dom";
import PendingSkills from "../pendingSkills/PendingSkills";
import AssignmentRequets from "../Assigments/PendingAssignmentRequest";


export default class EmployeeHome extends React.Component {
  render() {
    return (
      <>
       <PendingSkills match={{params:{managerId:2}}}></PendingSkills>
       <AssignmentRequets ></AssignmentRequets>
      </>
    );
  }
}
