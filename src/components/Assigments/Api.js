import axios from "axios";

const url = "http://localhost:8080/api/";
const currentLimit = "page=1&limit=20";

class Api {
  async getProjects() {
    const projects = await axios.get(
      `${url}projects/manager/2?${currentLimit}`, {withCredentials: true}
    );
    return projects.data;
  }
  async getProjectsByProjectName(projectName) {
    const projects = await axios.get(
      `${url}projects/name/${projectName}?${currentLimit}`, {withCredentials: true}
    );
    return projects.data;
  }
  async getProjectsByEmployeeName(employeeName) {
    const projects = await axios.get(
      `${url}projects/user/name/${employeeName}?${currentLimit}`, {withCredentials: true}
    );
    return projects.data;
  }
  async getEmpForProjects(projectID) {
    const employees = await axios.get(
      `${url}team/project/${projectID}?${currentLimit}`, {withCredentials: true}
    );
    return employees.data;
  }
  async getPendingAssignments(projectID) {
    const pending = await axios.get(
      `${url}assignments/request/2?${currentLimit}`, {withCredentials: true}
    );
    return pending.data;
  }
  async sendAssignment(status, assignID) {
    // console.log(assignID)
    const assign = await axios.post(
      `${url}assignments/status?response=${status}`,
      { id: assignID }, {withCredentials: true}
    );
    return assign.status === 200;
  }
  async employeeAssignmentsHistory(empID) {
    const history = await axios.get(
      `${url}assignments/${empID}?${currentLimit}`, {withCredentials: true}
    );
    return history.data;
  }

  async getMyTeam() {
    const employees = await axios.get(`${url}team/2/?${currentLimit}`, {withCredentials: true});
    return employees.data;
  }
  async addNewAssignment(
    employeeID,
    projectID,
    requestFromManagerID,
    requestToManagerID
  ) {
    const newAssign = await axios.post(`${url}assignments`, {
      employeeID: employeeID,
      projectID: projectID,
      requestFromManagerID: requestFromManagerID,
      requestToManagerID: requestToManagerID
    }, {withCredentials: true});

    return newAssign;
  }
  async addNewProject(value) {
    const {
      name,
      description,
      startDate,
      technicalSkill,
      productSkill
    } = value;
    const newProject = await axios.post(`${url}projects`, {
      name: name,
      description: description,
      startDate: startDate,
      technicalSkill: technicalSkill,
      productSkill: productSkill
    }, {withCredentials: true});
    return newProject;
  }
  async getDoneAssignByDate(date) {
    const result = await axios.get(
      `${url}assignments/done/2?requestedDate=${date}&${currentLimit}`, {withCredentials: true}
    );
    return result.data;
  }

  async getSearchEmployee(empName) {
    const result = await axios.get(
      `${url}team/name/${empName}?${currentLimit}`, {withCredentials: true}
    );

    return result.data;
  }
  async getEmployeeBySkill(requiredSkill, requiredLevel) {
    const result = await axios.post(`${url}team/skill?${currentLimit}`, {
      name: requiredSkill,
      level: requiredLevel
    }, {withCredentials: true});
    return result.data;
  }

  async getSkills() {
    const result = await axios.get(`${url}skills`, {withCredentials: true});
    return result.data;
  }
  async logout() {
    const result = await axios.get(`${url}login`, {withCredentials: true});
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
export default new Api();
