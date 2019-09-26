import React from "react";
// import { AssignHistoryForEmp } from "../data/AssignHistoryForEmp";
import { Link } from "react-router-dom";
import Api from "./Api";
import { toast } from "react-toastify";
export default class AssignmentRequets extends React.Component {
  constructor() {
    super();
    this.state = {
      PendingRequests: [],
      isLoading: true
    };
    this.sendPendingAssignment = this.sendPendingAssignment.bind(this);
  }

  async componentDidMount() {
    try {
      const PendingRequests = await Api.getPendingAssignments();
      setTimeout(() => {
        this.setState({
          isLoading: false
        });
      }, 500);
      this.setState({ PendingRequests });
    } catch (error) {
      this.setState({ PendingRequests: [] });
    }
  }
  async sendPendingAssignment(status, assignID) {
    try {
      const chanageStatus = await Api.sendAssignment(status, assignID);
      if (chanageStatus) {
        toast.success("Assignment Status Updated Successfully");
        try {
          const PendingRequests = await Api.getPendingAssignments();
          this.setState({ PendingRequests });
        } catch (error) {
          this.setState({ PendingRequests: [] });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  render() {
    return (
      <div className="row justify-content-center mt-4">
        <div className="row col-md-10 ">
          <h4>Pending Assignments</h4>
        </div>
        <div className="row col-md-10 justify-content-center">
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
                <th scope="col">Employee Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Request From Manager</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.PendingRequests.map((assign, i) => {
                return (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{assign.projectName}</td>
                    <td>{assign.employeeName}</td>
                    <td>{assign.startDate}</td>
                    <td>{assign.endDate}</td>
                    <td>{assign.status}</td>
                    <td>{assign.fromManagerName}</td>

                    <td>
                      <button
                        onClick={e => this.sendPendingAssignment(1, assign.id)}
                        className="btn btn-success mr-2"
                      >
                        {" "}
                        Accept
                      </button>
                      <button
                        onClick={e => this.sendPendingAssignment(0, assign.id)}
                        className="btn btn-danger"
                      >
                        {" "}
                        Reject{" "}
                      </button>
                    </td>
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
