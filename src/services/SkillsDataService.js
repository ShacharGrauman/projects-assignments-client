import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `http://localhost:8080/api`;

const productSkills = "productSkills";
const technicalSkills = "technicalSkills";

class SkillsDataService {
  getAllSkills() {
    return axios.get(`${API_URL}/skills`, { withCredentials: true });
  }

  sendPostRequest(
    opration,
    method,
    { id, employeeId, skillId, skillName, level, skillType, date, type }
  ) {
    method({ id, employeeId, skillId, skillName, level, skillType, date, type })
      .then(resp => {
        if (resp.data) {
          toast.success(`${opration} successful`);
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status !== 404) {
            toast.error(`${opration} failed  ${error.response.data.message}`);
          }
        } else {
          toast.error(`${opration} failed ${error.message}`);
        }
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
      .then(resp => {
        component.setState({ [arrName]: resp.data, loading: false });
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status !== 404) {
            toast.error(`failed to fetch Data ${error.response.data.message}`);
          }
        } else {
          toast.error(`failed to fetch Data ${error.message}`);
        }
        component.setState({ [arrName]: [], loading: false });
      });
  }

  retrieveProductSkillsById(id) {
    return axios.get(`${API_URL}/skills/employeeskills/${id}/PRODUCT`, {
      withCredentials: true
    });
  }

  retrieveTechnicalSkillsById(id) {
    return axios.get(`${API_URL}/skills/employeeskills/${id}/TECHNICAL`, {
      withCredentials: true
    });
  }

  retrieveProductSkillsHistoryById(id) {
    return axios.get(`${API_URL}/skills/approvedskillshistory/${id}/PRODUCT`, {
      withCredentials: true
    });
  }

  retrieveTechnicalSkillsHistoryById(id) {
    return axios.get(
      `${API_URL}/skills/approvedskillshistory/${id}/TECHNICAL`,
      { withCredentials: true }
    );
  }

  addNewSkill({ employeeId, skillId, skillName, level, type }) {
    console.log("empID" + employeeId, "sID" + skillId, skillName, level, type);
    if (skillId) {
      return axios.post(
        `${API_URL}/skills/`,
        {
          skillId,
          employeeId,
          skillName,
          level
        },
        { withCredentials: true }
      );
    } else {
      return axios.post(
        `${API_URL}/skills/`,
        {
          employeeId,
          skillName,
          level,
          type
        },
        { withCredentials: true }
      );
    }
  }

  updateSkillByIdSkill({ id, level }) {
    return axios.post(
      `${API_URL}/skills/updatelevel/`,
      {
        id,
        level
      },
      { withCredentials: true }
    );
  }

  removeUnapprovedSkillById({ id }) {
    return axios.delete(`${API_URL}/skills/${id}`, { withCredentials: true });
  }
}

export default new SkillsDataService();
