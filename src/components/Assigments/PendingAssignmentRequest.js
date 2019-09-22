import React from "react";
// import { AssignHistoryForEmp } from "../data/AssignHistoryForEmp";
import { Link } from "react-router-dom";
import Api from "./Api";
import { toast } from 'react-toastify';
export default class AssignmentRequets extends React.Component {
  constructor() {
    super();
    this.state = {
      PendingRequests: [],
      isLoading:true
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
      }, 1000);
      this.setState({ PendingRequests });
    } catch (error) {
      this.setState({ PendingRequests:[] });
    }
  }
  async sendPendingAssignment(status, assignID) {
    try {
      const chanageStatus = await Api.sendAssignment(status, assignID);
      if (chanageStatus) {
        toast.success("Assignment Added Succ")
        try {
          const PendingRequests = await Api.getPendingAssignments();
          this.setState({ PendingRequests });
        } catch (error) {
          this.setState({ PendingRequests:[] });
        }
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message);
    }
  }
  render() {
    return (
    this.state.isLoading ? <h1>Hello World!</h1>:
      <div className="col justify-content-md-center mt4">
        <table
          className="table"
          style={{
            width: "90%",
            marginLeft: "100px",
            marginTop: "20px",
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
        <footer
          aria-label="Page navigation example"
          style={{ marginTop: "50px" }}
        >
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item active" aria-current="page">
              <span className="page-link">
                1<span className="sr-only">(current)</span>
              </span>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>

            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}
