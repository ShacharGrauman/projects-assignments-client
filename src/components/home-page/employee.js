import React from "react";
import { Link } from "react-router-dom";
import MyOwnSkills from "../skills/MyOwnSkills";
import AssignHisToryTable from "../Assigments/AssignmentHistoryForEmp";

import {DataContext} from '../common/Provider/DataProvider';


class EmployeeHome extends React.Component {
  render() {

    let {id, email} = this.context.data;       
    console.log('dfjsldkfjlkdsjfldsf', id, email, this.context);
    return (
      <>
       <MyOwnSkills match={{params:{id}}}></MyOwnSkills>
       <AssignHisToryTable match={{params:{id,name:email,homePage:true}}}></AssignHisToryTable>
      </>
    );
  }
}

EmployeeHome.contextType = DataContext;

export default EmployeeHome;