import axios from 'axios';
const url="http://localhost:8080/api/"
const pageNumberLimit="pageNumber=1&limit=5"
class Api{
    
    async getProjects(){
        const projects = await axios.get(`${url}projects/manager/1`);
        return projects.data;
    }
    async getProjectsByProjectName(projectName){
        const projects = await axios.get(`${url}projects/name/${projectName}?${pageNumberLimit}`);
        return projects.data;

    }
    async getProjectsByEmployeeName(employeeName){
        const projects = await axios.get(`${url}projects/user/name/${employeeName}`);
        return projects.data;

    }
    async getEmpForProjects(projectID){
        const employees = await axios.get(`${url}team/project/${projectID}`);
        return employees.data;

    }
    async getPendingAssignments(projectID){
        const employees = await axios.get(`${url}assignments/request/1?pageNumber=1&limit=10`);
        return employees.data;

    }
    async sendAssignment(status,assignID){
        const assign = await axios.post(` `);
        return assign.status===200;

    }

}

export default new Api();