
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
    }
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
    // getDepartments : () =>{ 
    //     const departments = await fetch('./Data.js')
    //                             .then(res => res.json())
    //     return departments;
    //     }
    // ,
    // getRoles : () =>{ 
    //     const roles = await fetch('./Data.js')
    //                             .then(res => res.json())
    //     return roles;
    //     }
    // ,
    // getCountries : () =>{ 
    //     const countries = await fetch('./Data.js')
    //                             .then(res => res.json())
    //     return countries;
    //     }
    // ,
    // getWorkSites : () =>{ 
    //     const workSites = await fetch('./Data.js')
    //                             .then(res => res.json())
    //     return workSites
    //     }
    // ,
    // getAllData: () => {return await Promise.all([
    //         
    //         getData('roles'),
    //         getData('departments'),
    //         getData('workSites'),
    //         getData('countries')
    //     ])
    // }
    ,
    getUsersList: async function() {
        const users = await fetch('http://localhost:8080/api/employee')
            .then(response => response.json());

        return users;
    },

    getCount: (prop) => {
        return fetch(`http://localhost:8080/api/employee/${prop}`)

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
       
    }
}
