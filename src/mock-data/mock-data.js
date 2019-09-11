
export const USERS=[
    {
        id : 1,
        number: 1144,
        name:"Emad Silawi",
        roles: ["Employee","Manager","Amin"],
        department:"R&D",
        worksite:"Nazareth",
    },{
        id : 2,
        number: 233,
        name:"Fadi Muhammad",
        roles:"Team Leader",
        department:"R&D",
        worksite:"Nazareth",
    },{
        id : 3,
        number: 362,
        name:"Chis Issa",
        roles:"Employee",
        department:"QA Automation",
        worksite:"Ra'anana",
    },{
        id : 4,
        number: 445,
        name:"Samer Saida",
        roles:"Employee",
        department:"DB Analysis",
        worksite:"Nazareth",
    },{
        id : 5,
        number: 345,
        name:"Shahar Grauman",
        roles:"Manager",
        department:"R&D",
        worksite:"Nazareth",
    },{
        id : 6,
        number: 12,
        name:"Ezer Biron",
        roles:"CEO",
        department:"Finance",
        worksite:"Ra'anana",
    },
    ]
    

export const USER={
    details:{
        firstName:'Emad',
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