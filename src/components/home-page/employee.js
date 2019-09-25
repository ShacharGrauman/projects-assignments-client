import React from "react";
import { Link } from "react-router-dom";
import MyOwnSkills from "../skills/MyOwnSkills";
import AssignHisToryTable from "../Assigments/AssignmentHistoryForEmp";

import {DataContext} from '../common/Provider/DataProvider';


class EmployeeHome extends React.Component {
  render() {

    let {id} = this.context.data; 
    return (
      <>
      <AssignHisToryTable />
       {/* <MyOwnSkills match={{params:{id}}}></MyOwnSkills> */}
      </>
    );
  }
}

EmployeeHome.contextType = DataContext;

export default EmployeeHome;