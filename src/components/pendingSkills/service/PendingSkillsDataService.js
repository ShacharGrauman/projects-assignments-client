import axios from 'axios'


const API_URL = `http://localhost:8080/api/skills`


class PendingSkillsDataService {

    retrieveSkillsById(id){
        return axios.get(API_URL +'/employeeskills/'+id);
    }



    retrieveRequestedSkillsConfirmation(managerId){
         return axios.get(API_URL+'/'+managerId);
         
    }


    approveSkill(skill){
        return axios.post(API_URL+'/approve',skill);   
    }

    rejectReguestedSkill(id){
        return axios.delete(API_URL+'/'+id);
    }

}

export default new PendingSkillsDataService()