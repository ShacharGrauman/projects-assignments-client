import React from 'react';
import UserProfileHeader from './UserProfileHeader'
import UserProfileDetails from './UserProfileDetails'
import UserProfileRoles from './UserProfileRoles';
import UserProfileFooter from './UserProfileFooter';
import {USERS} from '../../mock-data/mock-data'

import {DataProvider} from '../common/Provider/DataProvider'
import {DataContext} from '../common/Provider/DataProvider'
import {api} from '../../mock-data/api'



export default class UserProfile extends React.Component{

    constructor(props){
        super(props);
        console.log(this.props)
        const {id}=this.props.match.params;
        this.state={
            profileMode:{edit:false, addUserForm:true}, // the state of the profile form.
                                                 // if addUserForm is set to false, its an add user form
            status:{deactivated:false, locked:false}, //the status of the user in the database. 
            userData:{
                details:{
                    id:+id?id:undefined,
                    firstName:undefined,
                    lastName:undefined,
                    employeeNumber:undefined,
                    workSite:{
                        name:'',
                        id:undefined,
                        country:{
                            name:undefined,
                            id:undefined
                        }
                    },
                    manager:{name:undefined,id:undefined},
                    phone:undefined,
                    email:undefined,
                    department:{name:undefined,id:undefined},
                    lastLogin:undefined,
                },
                roles:[{
                    id:undefined,
                    name:undefined,
                    description:undefined
                }],
                img:undefined
            }
        }
        
        this.toggleEditMode=this.toggleEditMode.bind(this)
        this.toggleLockUser=this.toggleLockUser.bind(this)

        
    }

    componentDidMount(){
        api.getUserById(3).then(data=>console.log(data))
        //then assign the values according to what you get from the database


        if (this.state.userData.details.id){
            this.setState({
                profileMode:{edit:true, addUserForm:false},
                status:{deactivated:false,locked:false}, // fix status values according to the backend
                userData:USERS.find(e=>e.details.id===+this.state.userData.details.id)
            })
        }else{
            this.setState({
                profileMode:{edit:true,addUserForm:true}
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

    render(){
        return(
         <>
        <div className="container">
            <div className="row p-0 m-0">
                <div className="col-12 mb-2 mr-3 ml-3 p-0 mt-5">
                    <UserProfileHeader imgURL={this.state.userData.img}
                                        employeeName={this.state.userData.details.firstName+" " + this.state.userData.details.lastName}
                                        isLocked={this.state.status.locked}
                                        id={this.state.userData.details.id}
                                        edit={this.state.profileMode.edit}
                                        toggleEditMode={this.toggleEditMode}
                                        />
<DataProvider>
                    <UserProfileDetails editMode={!this.state.profileMode.edit} 
                                        details={this.state.userData.details}/>

                    <UserProfileRoles   editMode={!this.state.profileMode.edit}
                                        userRoles={this.state.userData.roles}/>
</DataProvider>
                    <UserProfileFooter editMode={!this.state.profileMode.edit}
                                        isLocked={this.state.status.locked}
                                        toggleLockUser={this.toggleLockUser}
                                        addUserForm={this.state.profileMode.addUserForm}/>


                </div>
            </div>
        </div>  
            
                
            
         
                
        </>
        )
    }
}