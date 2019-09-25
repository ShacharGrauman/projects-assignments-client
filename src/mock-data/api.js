
import axios from 'axios';

const send = async (url, data) => {
    try{
        const response = await (
                data ? 
                    axios.post(`http://localhost:8080/api/${url}`, data,
                        {withCredentials:true} ) 
                        : 
                    axios.get(`http://localhost:8080/api/${url}`,
                        {withCredentials:true} )
        );
        
        return response.data;
    }catch(err){
        return err.response;
    }
}

export const api = {
    getDepartments : async function(){ 

        return await send('employee/departments');


        // const departments = await fetch('http://localhost:8080/api/employee/departments', {
        //     headers: 
        // })
        // return departments.json();
        }
    ,
    getRoles :async () =>{ 
        return await send('employee/roles');
        
        }
    ,
    getRolesWithPermissions:async () =>{ 
        return await send('roles');
    }
    ,
    getCountries :async () =>{ 
        return await send('employee/countries');
    }
    ,
    getWorkSites :async () =>{ 
        return await send('employee/worksites');
    }
    ,
    getManagers :async () =>{ 
        return await send('employee/managers');
    }
    ,
    getAllData: async function() {
        const  [departments,
                worksites,
                countries,
                roles,
                managers]= await Promise.all([
                        this.getDepartments(),
                        this.getWorkSites(),
                        this.getCountries(),
                        this.getRoles(),
                        this.getManagers()
                ])
        return {departments, worksites, countries, roles, managers}
    }
    ,
    getUsersList: async function() {
        return await send('employee?page=2&limit=10');       
    },

    getCount: async (prop) => {
        return await send(`employee/${prop}`);    
    },

    validateLogin: async (username,password)=> {
        return await send('login', {username, password});        
    },
    
    // (username, password)=>{
    //     return fetch('http://localhost:8080/api/login', {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers:{
    //             'Content-Type': 'application/json',
    //         },
    //         body:JSON.stringify({
    //             username,
    //             password
    //         }),
    //     })
    // },
    getUserById: async (id)=>{
        return await send(`employee/id?id=${id}`);
    },


    addUser: async ({details,img,roles})=>{

        return await send(`employee/`, JSON.stringify({
            employee:{
                   number:+details.employeeNumber.value,
                   firstName:details.firstName.value,
                   lastName:details.lastName.value,
                   email:details.email.value,
                   managerId:+details.manager.value,
                   department:details.department.value,
                   worksite:{
                        id:+details.workSite.value,
                        country:{
                             name:details.country.value
                        },
                   },
                   phone:details.phone.value,
                   loginStatus:false,
                   locked:false,
                   deactivated:false
            },
          roles:roles
        }));        
    },

    updateUserDetails: async({details,img,roles})=>{
        const updatedUser = await fetch(`http://localhost:8080/api/employee/id?id=${details.id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials: 'include',
            body:JSON.stringify({
                employee:{
                       id:+details.id,
                       number:+details.employeeNumber.value,
                       firstName:details.firstName.value,
                       lastName:details.lastName.value,
                       email:details.email.value,
                       managerId:+details.manager.value,
                       department:details.department.value,
                       worksite:{
                            id:+details.workSite.value
                       },
                       country:{
                            name:details.country.value
                       },
                       phone:details.phone.value,
                       loginStatus:false,
                       locked:false,
                       deactivated:false
                },
              roles:roles
            }),
            
        })
        return updatedUser;
    },

    toggleDeactivateUser: async(id)=>{
        const user = await fetch(`http://localhost:8080/api/employee/id?id=${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials: 'include',
            body:JSON.stringify({
               
            }),
            
        })
        return addedUser;
    },

    unlockUser: async(id)=>{
        const user = await fetch(`http://localhost:8080/api/employee/unlock/id?id=${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials: 'include',
        })
        return addedUser;
    },
    auditSearch: async(startDate, endDate, actionsFilter, employee)=>{
        return await send(`audit/date?number=${employee}&datefrom=${startDate}&dateto=${endDate}`);       
    },

    getAuditData: async(page, limit)=>{
        return await send(`audit?page=${page}&limit=${limit}`);
    },
    deactivateUser: async (id) =>{
        const deletedUser = await fetch(`http://localhost:8080/api/employee/id?id=${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
            withCredentials: 'include',
        })
        return deletedUser;
    },




    getData: async function(url) {
        return await send(url); 
    },
  
    addDepartment:async function({department}){
        return await send(`department`, JSON.stringify({name:department.value})); 
    },
  
    resetPassword: async function({email, employeeNumber}){
        return await send(`resetPassword`, JSON.stringify({
            email:email.value,
            employeeNumber:+employeeNumber.value
        })); 
  },
  sendEmail:async function({email, name, messageBody, messageTitle}){
    const sendEmailResult = await fetch(`http://localhost:8080/api/sendEmail`,{
      mode:'no-cors',
            body:JSON.stringify({
                toEmail:email,
                firstName:name,
                subject:messageTitle,
                text:messageBody
            }),            
        })
        return sendEmailResult;
   },
  addRole:async function(role){
        return await send(`roles`, JSON.stringify({
            name:role.name,
            description:role.description,
            permissions:role.permissions
        })); 
   },
    getAllPermissions :async () =>{ 
        return await send(`roles/permissions`); 
    },
   addworksite:async function({country, city, worksite}){
    return await send(`worksite`, JSON.stringify({
        name:worksite,
        country,
        city
    }));     
   },
}
