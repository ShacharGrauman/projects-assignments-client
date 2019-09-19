import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `http://localhost:8080/api/`;

const productSkills = "productSkills";
const technicalSkills = "technicalSkills";

class SkillsDataService {
  getAllSkills() {
    return axios.get(`${API_URL}/skills`);
  }

  sendPostRequest(
    opration,
    method,
    { id, employeeId, skillId, skillName, level, skillType, date }
  ) {
    method({ id, employeeId, skillId, skillName, level, skillType, date })
      .then(resp => {
        if (resp.data) {
          toast.success(`${opration} successful`);
        }
      })
      .catch(error => {
        toast.error(`${opration} failed ${error.message}`);
      })
      .finally(() => this.refetch());
  }

  fetchSkillsHistory(component, type, id, arrName) {
    if (type === technicalSkills) {
      this.fetchDataList(
        component,
        this.retrieveTechnicalSkillsHistoryById,
        id,
        arrName
      );
    } else if (type === productSkills) {
      this.fetchDataList(
        component,
        this.retrieveProductSkillsHistoryById,
        id,
        arrName
      );
    }
  }

  fetchDataList(component, method, id, arrName) {
    method(id)
      .then(resp => component.setState({ [arrName]: resp.data }))
      .catch(error => {
        toast.error(`failed to fetch Data ${error.message}`);
        component.setState({ [arrName]: [] });
      });
  }

  retrieveProductSkillsById(id) {
    return axios.get(`${API_URL}/skills/employeeskills/${id}/PRODUCT`);
  }

  retrieveTechnicalSkillsById(id) {
    return axios.get(`${API_URL}/skills/employeeskills/${id}/TECHNICAL`);
  }

  retrieveProductSkillsHistoryById(id) {
    return axios.get(`${API_URL}/skills/approvedskillshistory/${id}/PRODUCT`);
  }

  retrieveTechnicalSkillsHistoryById(id) {
    return axios.get(`${API_URL}/skills/approvedskillshistory/${id}/TECHNICAL`);
  }

  addNewSkill({ employeeId, skillId, skillName, level, type }) {
    console.log(employeeId, skillId, skillName, level, type);
    if (skillId) {
      return axios.post(`${API_URL}/skills/`, {
        skillId,
        employeeId,
        skillName,
        level
      });
    } else {
      return axios.post(`${API_URL}/skills/`, {
        employeeId,
        skillName,
        level,
        type
      });
    }
  }

  updateSkillByIdSkill({ id, level }) {
    return axios.post(`${API_URL}/skills/updatelevel/`, {
      id,
      level
    });
  }

  removeUnapprovedSkillById({ id }) {
    return axios.delete(`${API_URL}/skills/${id}`);
  }
}

export default new SkillsDataService();
