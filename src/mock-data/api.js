import { async } from "q";

// const users=await fetch('./Data,js')
//                 .then(res=>res.json());
// return users;


export const api = {
    getMyTeam: function(){
        return[
        {
            "id":"203456789",
            "img":"p1.jpg",
            "name":"Raneem Daher",
            "technicalSkills":[
                {name: "C", level:5},
                {name: "Java", level:4},
                {name:  "CSS", level:2},
                {name:  "React", level:3}
            ],
            "productSkills":[
                {name:"CRM",level:4},
                {name:"Office",level:3},
                {name:"Cleaning",level:3},
                {name:"Singing",level:1}
            ]
        },{
            "id":"625984231",
            "img":"p2.jpg",
            "name":"Tmer Aslan",
            "technicalSkills":[
                {name: "C++", level:4},
                {name: "C", level:3},
                {name: "Ruby", level:2},
                {name: "React", level:3}
            ],
            "productSkills":[
                {name:"Dancing",level:4},
                {name:"Office",level:3},
                {name:"Gaming",level:2},
                {name:"Singing",level:3}
            ]
        },
        {
            "id":"320625981",
            "img":"p3.jpg",
            "name":"Jeries Zamel",
            "technicalSkills":[
                {name: "JavaScirpt", level:4},
                {name: "HTML", level:3},
                {name:  "CSS", level:2},
                {name:  "React", level:3}
            ],
            "productSkills":[
                {name:"Running",level:4},
                {name:"Playing",level:3},
                {name:"Cleaning",level:2},
                {name:"Singing",level:3}
            ]
        },
        {
            "id":"562398423",
            "img":"p4.jpg",
            "name":"Raya Khateeb",
            "technicalSkills":[
                {name: "C#", level:4},
                {name: "HTML", level:3},
                {name:  "C++", level:2}
            ],
            "productSkills":[
                {name:"Football",level:5},
                {name:"Jumping",level:3},
                {name:"Singing",level:3}
            ]
        },
        {
            "id":"5621894236",
            "img":"p5.jpg",
            "name":"Alex Karev",
            "technicalSkills":[
                {name: "PHP", level:4},
                {name: "C", level:3},
                {name:  "Java", level:5},
            ],
            "productSkills":[
                {name:"Acting",level:4},
                {name:"Diving",level:3},
                {name:"Singing",level:3}
            ]
        },
        {
            "id":"126985432",
            "img":"p6.jpg",
            "name":"walaa Hamze",
            "technicalSkills":[
                {name: "JavaScript", level:5},
                {name: "C++", level:2},
                {name:  "Java", level:4},
                {name:  "HTML", level:3}
            ],
            "productSkills":[
                {name:"Dancing",level:5},
                {name:"Swimming",level:3},
                {name:"Singing",level:2}
            ]
        },
        {
            "id":"230659842",
            "img":"p7.jpg",
            "name":"Shahar Grauman",
            "technicalSkills":[
                {name: "JavaScript", level:5},
                {name: "CSS", level:4},
                {name:  "Java", level:5},
                {name:  "HTML", level:3}
            ],
            "productSkills":[
                {name:"Acting",level:5},
                {name:"Racing",level:4},
                {name:"Swimming",level:3}
            ]
        }
    ];
    },
    // getAllUsers : async () =>{
    //     //return await getData('users');

    //     const users = await fetch('http:localhost:8080/api/users', {
    //         headers: {
    //             'auth': 'ZW1hZEBnbWFpbC5jb206MTIzNDU2',
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         }
    //     })
    //     .then(response => response.json());

    //     return users;
    // },
    getDepartments : async function(){ 
        const departments = await fetch('http://localhost:8080/api/employee/departments')
        return departments.json();
        }
    ,
    getRoles :async () =>{ 
        const roles = await fetch('http://localhost:8080/api/employee/roles')
        return roles.json();
        }
    ,
    getCountries :async () =>{ 
        const countries = await fetch('http://localhost:8080/api/employee/countries')
        return countries.json();
        }
    ,
    getWorkSites :async () =>{ 
        const workSites = await fetch('http://localhost:8080/api/employee/WorkSites')
        return workSites.json();
        }
    ,
    getAllData: async function() {
        const  [departments,
                worksites,
                countries,
                roles]= await Promise.all([
                        this.getDepartments(),
                        this.getWorkSites(),
                        this.getCountries(),
                        this.getRoles()
                ])
        return {departments, worksites, countries, roles}
    }
    ,
    getUsersList: async function() {
        const users = await fetch('http://localhost:8080/api/employee')
            .then(response => response.json());

        return users;
    },

    getCount: function() {
        return fetch('http://localhost:8080/api/users')
            .then(res => res.json());
    },

    validateLogin: (username, password)=>{
        return fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username,
                password
            }),
            
        })
       
    },


    getUserById: async (id)=>{
        const user = await fetch(`http://localhost:8080/api/employee/id?id=${id}`)
        return user.json();
    },


    addUser: async (user)=>{
        const addedUser = await fetch(`http://localhost:8080/api/employee/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                number:user.employeeNumber,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                managerId:user.managerId,
                department:user.department,
                worksite:{
                    id:user.worksite.id,
                    name:user.worksite.name,
                    country:{
                        id:user.worksite.country.id,
                        name:user.worksite.country.id
                    },
                    city:user.worksite.city,
                },
                phone:user.country,
                phone:user.phone,
                loginStatus:false,
                locked:false,
                deactivated:false
            }),
            
        })
        return addedUser;
    },

    updateUserDetails: async(id, user)=>{
        const addedUser = await fetch(`http://localhost:8080/api/employee/`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id:user.id,
                number:user.employeeNumber,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                managerId:user.managerId,
                department:user.department,
                worksite:{
                    id:user.worksite.id,
                    name:user.worksite.name,
                    country:{
                        id:user.worksite.country.id,
                        name:user.worksite.country.id
                    },
                    city:user.worksite.city,
                },
                phone:user.country,
                phone:user.phone,
                loginStatus:false,
                locked:false,
                deactivated:false
            }),
            
        })
        return addedUser;
    },

    toggleDeactivateUser: async(id)=>{
        const user = await fetch(`http://localhost:8080/api/employee/id?id=${id}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
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
            body:JSON.stringify({
               
            }),
            
        })
        return addedUser;
    }




}
