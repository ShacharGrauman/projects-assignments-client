import axios from "axios";

const USERNAME = "someUser";

const API_URL = `http://localhost:8080/api/`;

class SkillsDataService {
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
    //return axios.get(`${API_URL}/Skills`);
  }

  retrieveTechnicalSkillsHistoryById(id) {
    //return axios.get(`${API_URL}/Skills`);
  }

  retrieveRequestedTechnicalSkillsConfirmation(managerId) {
    // return RequestedTechnicalSkillsConfirmation;
  }

  retrieveRequestedProductSkillsConfirmation(managerId) {
    //return RequestedProductSkillsConfirmation;
  }

  retrieveAssignementsOfEmployeeById(id) {
    //return axios.get(`${API_URL}/Skills`);
    // return assignmentsOfEmployee;
  }

  retrieveEmployeesOfManagerById(id) {
    //return axios.get(`${USERNAME_API_URL}/Skills`);
    //return EmployeesOfManager;
  }

  retrieveEmployeeProfileInfoById(id) {
    //return axios.get(`${USERNAME_API_URL}/Skills`);
    //  return employeePersonalInfo;
  }

  approveSkillReguestById(id, comment) {
    //return axios.get(`${USERNAME_API_URL}/Skills`);
  }

  declineSkillReguestById(id) {
    //return axios.get(`${USERNAME_API_URL}/Skills`);
  }

  addNewSkill(employeeId, skillName, level, date, skillType) {
    /*const response = await axios.post(`${API_URL}/skills/`, {
      employeeId,
      skillName,
      level,
      date,
      skillType
    });
    if (response.status === 200) {
      return response.data;
    }*/

    return axios.post(`${API_URL}/skills/`, {
      employeeId,
      skillName,
      level,
      date,
      skillType
    });
  }

  updateSkillByIdSkill(id, level) {
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

  removeUnapprovedSkillById(id) {
    /*const response = await axios.delete(`${API_URL}/skills/${id}`);
    if (response.status === 200) {
      return response.data;
    }*/
    return axios.delete(`${API_URL}/skills/${id}`);
  }
}

export default new SkillsDataService();
