import axios from "axios";
import makeTaost from "../components/shared-components/Toast";

const USERNAME = "someUser";

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
          makeTaost.success(`${opration} successful`);
        }
      })
      .catch(error => {
        makeTaost.error(`${opration} successful failed ${error.message}`);
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
        makeTaost.error(`failed to fetch Data ${error.message}`);
        component.setState({ [arrName]: [] });
      });
  }

  retrieveProductSkillsById(id) {
    return axios.get(`${API_URL}/skills/employeeskills/${id}/PRODUCT`);
    /*if (response.status === 200) {
      return response.data;
    }
    return null;*/
    //return ProductSkills;

    // return axios.get(`${API_URL}/skills/employeeskills/${id}/PRODUCT`);
  }

  retrieveTechnicalSkillsById(id) {
    /*const response = await axios.get(
      `${API_URL}/skills/employeeskills/${id}/TECHNICAL`
    );
    if (response.status === 200) {
      return response.data;
    }*/
    // return TechnicalSkills;

    return axios.get(`${API_URL}/skills/employeeskills/${id}/TECHNICAL`);
  }

  retrieveProductSkillsHistoryById(id) {
    return axios.get(`${API_URL}/skills/approvedskillshistory/${id}/PRODUCT`);
  }

  retrieveTechnicalSkillsHistoryById(id) {
    return axios.get(`${API_URL}/skills/approvedskillshistory/${id}/TECHNICAL`);
  }

  addNewSkill({ employeeId, skillId, skillName, level, skillType, date }) {
    if (skillId) {
      return axios.post(`${API_URL}/skills/`, {
        skillId,
        employeeId,
        skillName,
        level
        // date,
      });
    } else {
      return axios.post(`${API_URL}/skills/`, {
        employeeId,
        skillName,
        level,
        // date,
        type: skillType
      });
    }
  }

  updateSkillByIdSkill({ id, level }) {
    /*const response = await axios.post(`${API_URL}/skills/updatelevel/`, {
      id,
      level
    });
    if (response.status === 200) {
      return response.data;
    }*/
    return axios.post(`${API_URL}/skills/updatelevel/`, {
      id,
      level
    });
  }

  removeUnapprovedSkillById({ id }) {
    /*const response = await axios.delete(`${API_URL}/skills/${id}`);
    if (response.status === 200) {
      return response.data;
    }*/
    return axios.delete(`${API_URL}/skills/${id}`);
  }
}

export default new SkillsDataService();
