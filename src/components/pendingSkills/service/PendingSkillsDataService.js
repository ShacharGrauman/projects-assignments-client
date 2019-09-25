import axios from "axios";

const API_URL = `http://localhost:8080/api/skills`;

class PendingSkillsDataService {
  retrieveSkillsById(id) {
    return axios.get(API_URL + "/employeeskills/" + id, {
      withCredentials: true
    });
  }

  retrieveRequestedSkillsConfirmation(managerId) {
    return axios.get(API_URL + "/teamskills/" + managerId, {
      withCredentials: true
    });
  }

  approveSkill(skill) {
    return axios.post(API_URL + "/approve", skill, { withCredentials: true });
  }

  rejectReguestedSkill(id) {
    return axios.delete(API_URL + "/" + id, { withCredentials: true });
  }
}

export default new PendingSkillsDataService();
