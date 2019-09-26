import React from "react";
import { Link } from "react-router-dom";
import PendingSkills from "../pendingSkills/PendingSkills";
import AssignmentRequets from "../Assigments/PendingAssignmentRequest";
import Loading from "../common/loading";

export default class EmployeeHome extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: true
    };
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({
          flag:false
      })
  }, 1500);
  }
  render() {
    return this.state.flag ? (
      <Loading />
    ) : (
      <>
        <PendingSkills match={{ params: { managerId: 2 } }}></PendingSkills>
        <AssignmentRequets></AssignmentRequets>
      </>
    );
  }
}
