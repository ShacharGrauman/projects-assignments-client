import React from "react";
import { Link } from "react-router-dom";
import MyOwnSkills from "../skills/MyOwnSkills";
import AssignHisToryTable from "../Assigments/AssignmentHistoryForEmp";


export default class EmployeeHome extends React.Component {
  render() {
    return (
      <>
       <MyOwnSkills match={{params:{id:5}}}></MyOwnSkills>
       <AssignHisToryTable match={{params:{id:5,name:'Lama Azaizi',homePage:true}}}></AssignHisToryTable>
      </>
    );
  }
}
