import axios from "axios";
import { toast } from "react-toastify";
const url = "http://localhost:8080/api/";
const pageNumberLimit = "pageNumber=1&limit=20";
const curentLimit = "page=1&limit=20";
class Api {
  async getProjects() {
    const projects = await axios.get(`${url}projects/manager/2?${curentLimit}`);
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
      `${url}projects/user/name/${employeeName}?${curentLimit}`
    );
    return projects.data;
  }
  async getEmpForProjects(projectID) {
    const employees = await axios.get(
      `${url}team/project/${projectID}?${curentLimit}`
    );
    return employees.data;
  }
  async getPendingAssignments(projectID) {
    const pending = await axios.get(
      `${url}assignments/request/2?${curentLimit}`
    );
    return pending.data;
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
    const history = await axios.get(
      `${url}/assignments/${empID}?${curentLimit}`
    );
    return history.data;
  }

  async getMyTeam() {
    const employees = await axios.get(`${url}team/2/?${curentLimit}`);
    return employees.data;
  }
  async addNewAssignment(
    employeeID,
    projectID,
    requestFromManagerID,
    requestToManagerID
  ) {
    // console.log(assignID)
    const newAssign = await axios.post(`${url}assignments`, {
      employeeID: employeeID,
      projectID: projectID,
      requestFromManagerID: requestFromManagerID,
      requestToManagerID: requestToManagerID
    });
    console.log(newAssign)
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
    const newProject= await axios.post(`${url}projects`, {
        name: name,
        description: description,
        startDate: startDate,
        technicalSkill: technicalSkill,
        productSkill: productSkill
      })
   
    return newProject;
  }
  async getDoneAssignByDate(date) {
    const result = await axios.get(
      `${url}assignments/done/2?requestedDate=${date}&${curentLimit}`
    );
    return result.data;
  }
  
  async getSearchEmployee(empName) {
    const result = await axios.get(
      `${url}team/name/${empName}?${curentLimit}`
    );
   
    return result.data;
  }
  async getEmployeeBySkill(requiredSkill,requiredLevel){
    // console.log(requiredSkill);
    // console.log(requiredLevel);
    const result = await axios.post(`${url}team/skill?${curentLimit}`,{
      name :requiredSkill,
      level:requiredLevel
    })
    return result.data;
  }
  // fetch("http://localhost:8080//skills/")
 async getSkills(){
  const result = await axios.get(
    `${url}skills`
  );
  console.log(result.data)
  return result.data;
 }
}
export default new Api();
