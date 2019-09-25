import React from "react";
import { Link } from "react-router-dom";
import Api from "./Api";
import {DataContext} from '../common/Provider/DataProvider'
export default class AssignHisToryTable extends React.Component {
  constructor() {
    super();
    this.state = {
      EmpHistory: [],
    };
  }
  async componentDidMount() {

    const id = this.context.data.id;
    const EmpHistory = await Api.employeeAssignmentsHistory(id);
    this.setState({ EmpHistory });
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-8 col-sm-10 col-xs-12 mt-4">
          <table
            className="table"
            style={{
              border: "1px solid black",
              textAlign: "center"
            }}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Request From Manager</th>
                <th scope="col">Request For Manager</th>
              </tr>
            </thead>
            <tbody>
              {this.state.EmpHistory.map((assign, i) => {
                return (
                  <tr>
                    <td>{i}</td>
                    <td>{assign.projectName}</td>
                    <td>{assign.startDate}</td>
                    <td>{assign.endDate}</td>
                    <td>{assign.status}</td>
                    <td>{assign.fromManagerName}</td>
                    <td>{assign.toManagerName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
AssignHisToryTable.contextType= DataContext