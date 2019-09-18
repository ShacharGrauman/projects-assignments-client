import React from "react";
// import { AssignHistoryForEmp } from "../data/AssignHistoryForEmp";
import { Link } from "react-router-dom";
export default class AssignmentRequets extends React.Component {
  constructor() {
    super();
    this.state = {
      PendingRequests: []
    };
    this.sendPendingAssignment = this.sendPendingAssignment.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      fetch(
        `http://localhost:8080/api/assignments/assignmentsrequest?managerid=1&pageNumber=1&limit=10`
      )
        .then(response => response.json())
        .then(pending => {
          this.setState({
            PendingRequests: pending
          });
        });
    }, 0);
   
  }
  sendPendingAssignment(status, AssignID) {
    
    // console.log(AssignID);
    console.log(status);
    // fetch("http://localhost:8080/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     AssignmentID: AssignID
    //     status:status
    //   })
    // })
    //   .then(res => {
    //     if (res.ok) this.props.history.push("/");
    //     else {
    //       console.log("Error Logging in");
    //     }
    //   })
    //   .catch(err => console.error(err));
  }
  render() {
    return (
      <div className="col justify-content-md-center">
        <table
          className="table"
          style={{
            width: "85%",
            marginLeft: "100px",
            marginTop: "20px",
            border: "1px solid black",
            textAlign: "center"
          }}
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Assignment ID</th>
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
            {this.state.PendingRequests.map((Assign, i) => {
              return (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{Assign.projectID}</td>
                  <td>{Assign.projectName}</td>
                  <td>{Assign.employeeName}</td>
                  <td>{Assign.startDate}</td>
                  <td>{Assign.endDate}</td>
                  <td>{Assign.status}</td>
                  <td>{Assign.requestFromManagerID}</td>

                  <td>
                    <button
                      onClick={e =>
                        this.sendPendingAssignment("1", Assign.projectID)
                      }
                      className="btn btn-success mr-2"
                    >
                      {" "}
                      Accept
                    </button>
                    <button
                      onClick={e =>
                        this.sendPendingAssignment("0", Assign.projectID)
                      }
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
