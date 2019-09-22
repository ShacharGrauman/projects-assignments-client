import React from "react";
// import { AssignHistoryForEmp } from "../data/AssignHistoryForEmp";
import { Link } from "react-router-dom";
import Api from "./Api";
export default class AssignHisToryTable extends React.Component {
  constructor() {
    super();
    this.state = {
      EmpHistory: [],
      MyEmp: {}
    };
  }
  async componentDidMount() {
    console.log(this.props.match)
    const { name, id } = this.props.match.params;
    this.setState({
      MyEmp: { id: id, name: name }
    });

    const EmpHistory = await Api.employeeAssignmentsHistory(id);
    this.setState({ EmpHistory });
  }

  render() {
    return (
      
      <div className="col justify-content-md-center">
        <div className="row" style={{ width: "300x" }}>
          <div className="col md-3"></div>

          <div className="col md-6">
            <div class="card">
              <div class="card-header">{this.state.MyEmp.name} </div>
              <div class="card-body">
                
                <Link to="/Projects" className="btn btn-outline-info">
                  Back
                </Link>
                <button className="btn btn-outline-info ml-3">
                  Profile Details
                </button>
              </div>
            </div>
          </div>
          <div className="col md-3"></div>
        </div>
        {/* <h1 style={{ marginLeft: "500px" }}>History Table For Emp {this.state.myMatch.id} </h1> */}

        <table
          className="table"
          style={{
            width: "70%",
            marginLeft: "200px",
            marginTop: "20px",
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
