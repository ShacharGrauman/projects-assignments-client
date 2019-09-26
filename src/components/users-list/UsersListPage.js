import React from "react";
import UsersTable from "./UsersTable";
import UsersStatus from "./UsersStatus";
import UsersDetailsGraphs from "./UsersDetailsGraphs";
import { api } from "../../mock-data/api";
import Loading from "../common/loading";
class UsersListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      userStatuses: {
        rolesCount: 1,
        departmentsCount: 1,
        workSitesCount: 1,
        usersCount: 1
      },
      rowsPerPage: 10,
      flag: true
    };

    this.componentDidMount();
    this.getUsersCount = this.getUsersCount.bind(this);
  }

  async componentDidMount() {
    await Promise.all([
      api.getCount("countRoles"),
      api.getCount("countDepartments"),
      api.getCount("countWorkSites"),
      api.getCount("countEmployees")
    ]).then(([rolesCount, departmentsCount, workSitesCount, usersCount]) =>
      this.setState({
        userStatuses: {
          rolesCount,
          departmentsCount,
          workSitesCount,
          usersCount
        }
      })
    );
    setTimeout(() => {
      this.setState({ flag: false });
    }, 1000);
  }

  async getUsersCount() {
    const result = await api.getCount("countEmployees");
    return result;
  }

  render() {
    return (
        this.state.flag ?<Loading />  :
      <div className="m-5">
        <div className="row justify-content-center">
          <h1 className="alert alert-light" role="alert">
            Users
          </h1>
        </div>

        <UsersStatus userStatuses={this.state.userStatuses} />
        <div className="row d-flex">
          <div className="col-lg-8">
            <UsersTable
              userCount={this.state.userStatuses.usersCount}
              rowsPerPage={this.state.rowsPerPage}
            />
          </div>
          <div className="col-lg-4">
            <UsersDetailsGraphs />
          </div>
        </div>
      </div>
    );
  }
}

export default UsersListPage;
