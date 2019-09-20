import React from 'react';
import UserProfileHeader from './UserProfileHeader'
import UserProfileDetails from './UserProfileDetails'
import UserProfileRoles from './UserProfileRoles';
import UserProfileFooter from './UserProfileFooter';

import {DataProvider} from '../common/Provider/DataProvider'
import {api} from '../../mock-data/api'



export default class UserProfile extends React.Component{

    constructor(props){
        super(props);
        const {id}=this.props.match.params;
        this.state={
            profileMode:{edit:false, addUserForm:true}, // the state of the profile form.
                                                    // if addUserForm is set to false, its an add user form
            status:{deactivated:false, locked:false}, //the status of the user in the database. 
            userData:{
                details:{
                    id:+id?id:undefined,
                    firstName:{value:'',errors:[],validations:{required:true}},
                    lastName:{value:'',errors:[],validations:{required:true}},
                    employeeNumber:{value:'',errors:[],validations:{required:true}},
                    workSite:{value:'',errors:[],validations:{required:true}},
                    country:{value:'',errors:[],validations:{required:true}},
                    managerName:{value:'',errors:[],validations:{required:true}},
                    manager:{value:'',errors:[],validations:{required:true}},
                    phone:{value:'',errors:[],validations:{required:true}},
                    email:{value:'',errors:[],validations:{required:true, isEmail:true}},
                    department:{value:'',errors:[],validations:{required:true}},
                    lastLogin:undefined,
                },
                roles:[],
                non_userRoles:[],
                img:'x'
            }
        }
        
        this.toggleEditMode=this.toggleEditMode.bind(this)
        this.toggleLockUser=this.toggleLockUser.bind(this)
        this.printRoles = this.printRoles.bind(this)
        this.toggleRole = this.toggleRole.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.addUser = this.addUser.bind(this)
        this.deactivateUser = this.deactivateUser.bind(this)
    }

    async componentDidMount(){
        const allRoles = await api.getRoles();

    if (this.state.userData.details.id ){
        api.getUserById(this.state.userData.details.id).then(({employee,managerName,lastLogin,roles})=>{
            
            const non_userRoles = allRoles.filter((elem) => !roles.find(({ name }) => elem.name === name))


            this.setState({
                profileMode:{edit:false, addUserForm:false},
                status:{deactivated:employee.deactivated,locked:employee.locked}, // fix status values according to the backend
                userData:{
                    details:{
                        id:+this.state.userData.details.id,
                        firstName:{...this.state.userData.details.firstName,value:employee.firstName},
                        lastName:{...this.state.userData.details.lastName, value:employee.lastName},
                        employeeNumber:{...this.state.userData.details.employeeNumber, value:employee.number},
                        workSite:{...this.state.userData.details.workSite, value:employee.workSite},
                        country:{...this.state.userData.details.country, value:employee.country},
                        manager:{...this.state.userData.details.manager, value:employee.manager},
                        managerName:{...this.state.userData.details.managerName, value:managerName},
                        phone:{...this.state.userData.details.phone, value:employee.phone},
                        email:{...this.state.userData.details.email, value:employee.email},
                        department:{...this.state.userData.details.department, value:employee.department},
                        lastLogin:lastLogin,
                    },
                    roles:roles,
                    non_userRoles,

                    img:'x' 
                }
            })
        })}else{
            this.setState({
                profileMode:{edit:true,addUserForm:true},
                userData:{...this.state.userData, non_userRoles:allRoles}
        })


    }
    }

    toggleEditMode(){
       this.setState({
        profileMode:{edit:!this.state.profileMode.edit, addUserForm:false }
       })
        
    }

    toggleLockUser(){
        this.setState({
            status:{deactivated:false, locked:!this.state.status.locked},
            profileMode:{edit:false,addUserForm:true},
        })
    }

    addRoles(rolesSelected){
        this.setState({
            userData:{...this.state.userData,
                roles:[...this.state.userData.roles, ...rolesSelected]
            },
        })
    }
    removeRoles(rolesSelected){
        console.log(this.state.userData.roles)
        console.log('Removing Roles' , rolesSelected)
    }
    toggleRole(rolesSelected){ //rolesSelected is an array of Roles. innerText to access the values
    if(!this.state.userData.roles.map(el=>el.id).includes(rolesSelected[0].id)){
        this.addRoles(rolesSelected);
    }else{
        this.removeRoles(rolesSelected);
    }
    }

    addUser(){
        console.log(this.state.userData)
        // api.addUser(this.state.userData)
        // .then(res=>{
        // if(res.ok)
        //     console.log('OK!!')
        // else{
        //     console.log('Error Adding the user')
        // }
        // })
        // .catch(err=>console.error(err));
    }

    printRoles(){
        console.log({
            "employee":{
                "id":this.state.userData.details.id,
                "number":this.state.userData.details.employeeNumber,
                "firstName":this.state.userData.details.firstName,
                "lastName":this.state.userData.details.lastName,
               "email":this.state.userData.details.email,
               "managerId":this.state.userData.details.manager.id,
               "department":this.state.userData.details.department,
               "worksite":{
                    "id":this.state.userData.details.workSite.id
               },
               "country":{
                    "name":this.state.userData.details.workSite.country.name
               },
               "phone":this.state.userData.details.phone,
               "loginStatus":false,
               "locked":false,
               "deactivated":false
        },
      "roles":this.state.userData.roles
    })
    }

    handleRequiredValidation(name, value) {
        if (!value) {
            return `*${name} is required`;
        }
    }

    handlePatternValidation(name, value, patternString) {
        if (patternString) {
            const pattern = new RegExp(patternString)
            if (pattern.test(value)) {
                return `*invalid ${name}`;
            }
        }
    }
    
    handleInputChange({target:{name, value}}){
        const {validations}=this.state.userData.details[name];
        const errors=[];

{/** required input validation */}
    if(validations.required){
        errors.push(this.handleRequiredValidation(name, value))
    }
{/** Valid email input */}
        if(validations.isEmail){
            errors.push(this.handlePatternValidation(name, value,'!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/'))
        }


{/** Update the state with the errors if exist*/}
        this.setState({             
            userData:{
                ...this.state.userData,
                details:{...this.state.userData.details,
                        [name]:{...this.state.userData.details[name],
                        value,
                        errors}}
            }
        });
    }

    deactivateUser(){
        api.deactivateUser(this.state.userData.details.id).then(response =>console.log(response))
    }
    
    
    render(){
        return(
         <>
        <div className="container">
            <div className="row p-0 m-0">
                <div className="col-12 mb-2 mr-3 ml-3 p-0 mt-5">
                    <UserProfileHeader imgURL={this.state.userData.img}
                                        employeeName={this.state.userData.details.firstName.value+" " + this.state.userData.details.lastName.value}
                                        isLocked={this.state.status.locked}
                                        id={this.state.userData.details.id}
                                        edit={this.state.profileMode.edit}
                                        toggleEditMode={this.toggleEditMode}
                                        />
<DataProvider>
                    <UserProfileDetails editMode={!this.state.profileMode.edit}
                                        addUserForm={this.state.profileMode.addUserForm}
                                        details={this.state.userData.details}
                                        handleInputChange={this.handleInputChange}/>

                    <UserProfileRoles   editMode={!this.state.profileMode.edit}
                                        userRoles={this.state.userData.roles}
                                        toggleRole={this.toggleRole}
                                        non_userRoles={this.state.userData.non_userRoles}/>
</DataProvider>
                    <UserProfileFooter editMode={!this.state.profileMode.edit}
                                        isLocked={this.state.status.locked}
                                        toggleLockUser={this.toggleLockUser}
                                        addUserForm={this.state.profileMode.addUserForm}
                                        printRoles={this.printRoles}
                                        addUser={this.addUser}
                                        deactivateUser={this.deactivateUser}/>


                </div>
            </div>
        </div>  
            
                
            
         
                
        </>
        )
    }
}