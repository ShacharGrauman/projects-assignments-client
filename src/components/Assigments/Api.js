import axios from "axios";
const url = "http://localhost:8080/api/";
const pageNumberLimit = "pageNumber=1&limit=20";
const curentLimit = "currentPage=1&limit=20";
class Api {
  async getProjects() {
    const projects = await axios.get(`${url}projects/manager/2`);
    return projects.data;
  }
  async getProjectsByProjectName(projectName) {
    const projects = await axios.get(
      `${url}projects/name/${projectName}?${curentLimit}`
    );
    return projects.data;
  }
  async getProjectsByEmployeeName(employeeName) {
    const projects = await axios.get(
      `${url}projects/user/name/${employeeName}`
    );
    return projects.data;
  }
  async getEmpForProjects(projectID) {
    const employees = await axios.get(`${url}team/project/${projectID}?${curentLimit}`);
    return employees.data;
  }
  async getPendingAssignments(projectID) {
    const employees = await axios.get(
      `${url}assignments/request/2?${pageNumberLimit}`
    );
    return employees.data;
  }
  async sendAssignment(status, assignID) {
    // console.log(assignID)
    const assign = await axios.post(
      `${url}assignments/status?response=${status}`,
      { id: assignID }
    );
    // console.log(assign)
    return assign.status === 200;
  }
  async employeeAssignmentsHistory(empID) {
    const history = await axios.get(`${url}/assignments/${empID}/?${pageNumberLimit}`);
    return history.data;
  }

  async getMyTeam() {
    const employees = await axios.get(`${url}team/2/?${pageNumberLimit}`);
    return employees.data;
  }
  async addNewAssignment(employeeID,projectID,requestFromManagerID,requestToManagerID) {
    // console.log(assignID)
    const newAssign = await axios.post(
      `${url}assignments`,
      {
        employeeID: employeeID,
        projectID: projectID,
        requestFromManagerID: requestFromManagerID,
        requestToManagerID: requestToManagerID
      }
    );
    
    return newAssign.status === 200;
  }
}

export default new Api();
