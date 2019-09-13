
export const USERS=[ // Users on the users-list page (ADMIN)
    {
        details:{
            id:1,
            employeeNumber:'',
            firstName:'user1',
            lastName:'Silawi',
            workSite:{
                name:'Nazareth',
                id:1,
                country:{
                    name:'Israel',
                    id:1
                }
            },
            manager:{name:'Shahar',id:2},
            phone:'058-9999999',
            email:'emad@amdocs.com',
            department:{name:'R&D',id:1},
            lastLogin:'29/08/2019',
        },
        roles:{
            roles:[{
                id:1,
                name:'Manager',
                description:'Description unavailable'
            }]
        },
        img:'image unavailable'
    },{
        details:{
            id:2,
            employeeNumber:'',
            firstName:'user24',
            lastName:'Silawi',
            workSite:{
                name:'Nazareth',
                id:1,
                country:{
                    name:'Israel',
                    id:1
                }
            },
            manager:{name:'Shahar',id:2},
            phone:'058-9999999',
            email:'emad@amdocs.com',
            department:{name:'R&D',id:1},
            lastLogin:'29/08/2019',
        },
        roles:{
            roles:[{
                id:1,
                name:'Manager',
                description:'Description unavailable'
            }]
        },
        img:'image unavailable'
    },{
        details:{
            id:3,
            employeeNumber:'',
            firstName:'user3',
            lastName:'Silawi',
            workSite:{
                name:'Nazareth',
                id:1,
                country:{
                    name:'Israel',
                    id:1
                }
            },
            manager:{name:'Shahar',id:2},
            phone:'058-9999999',
            email:'emad@amdocs.com',
            department:{name:'R&D',id:1},
            lastLogin:'29/08/2019',
        },
        roles:{
            roles:[{
                id:1,
                name:'Manager',
                description:'Description unavailable'
            }]
        },
        img:'image unavailable'
    }
    ]
    

export const USER={ // User profile page (ADMIN)
    details:{
        id:'',
        employeeNumber:'',
        firstName:'',
        lastName:'Silawi',
        workSite:{
            name:'Nazareth',
            id:1,
            country:{
                name:'Israel',
                id:1
            }
        },
        manager:{name:'Shahar',id:2},
        phone:'058-9999999',
        email:'emad@amdocs.com',
        department:{name:'R&D',id:1},
        lastLogin:'29/08/2019',
    },
    roles:{
        roles:[{
            id:1,
            name:'Manager',
            description:'Description unavailable'
        }]
    },
    img:{
        imgURL:'image unavailable',
    }
}


export const UserRoles=[ //User roles - used in user-profile page (ADMIN)
    {
        id:1,
        name:'Employee',
    },
    {
        id:2,
        name:'Manager',
    },
    {
        id:4,
        name:'HR Manager',
    },
]

export const AllRoles=[ // All roles
    {
        id:1,
        name:'Employee',
    },
    {
        id:2,
        name:'Manager',
    },
    {
        id:3,
        name:'Admin',
    },
    {
        id:4,
        name:'HR Manager',
    },
    {
        id:5,
        name:'Intern',
    },
    {
        id:6,
        name:'CEO',
    },
]

export const AuditTableData=[ //Audit Rows
    {
        userId:1,
        fullname:'fadi muhammad',
        date:Date(),
        time: Date(),
        activity:'Login'
    },
    {
        userId:2,
        fullname:'fadi muhammad',
        date:Date(),
        time: Date(),
        activity:'Login'
    },
    {
        userId:3,
        fullname:'fadi muhammad',
        date:Date(),
        time: Date(),
        activity:'Login'
    },
    {
        userId:4,
        fullname:'fadi muhammad',
        date:Date(),
        time: Date(),
        activity:'Login'
    },

]
