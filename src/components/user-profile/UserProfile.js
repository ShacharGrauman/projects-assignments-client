import React from 'react';
import UserProfileHeader from './UserProfileHeader'
import UserProfileDetails from './UserProfileDetails'
import UserProfileRoles from './UserProfileRoles';
import UserProfileFooter from './UserProfileFooter';
import {USERS} from '../../mock-data/mock-data'

export default class UserProfile extends React.Component{

    constructor(props){
        super(props);
        const {id}=this.props.match.params;
        this.state={
            mode:{edit:false, add:false},
            status:{deactivated:false, locked:false},
            userData:{
                details:{
                    id:+id?id:undefined,
                    firstName:'',
                    lastName:'',
                    employeeNumber:'',
                    workSite:{
                        name:'',
                        id:-1,
                        country:{
                            name:'',
                            id:''
                        }
                    },
                    manager:{name:'',id:-1},
                    phone:'',
                    email:'',
                    department:{name:'',id:-1},
                    lastLogin:'',
                },
                roles:{
                    roles:[{
                        id:'',
                        name:'',
                        description:''
                    }]
                },
                img:''
            }
        }
        
        this.toggleEditMode=this.toggleEditMode.bind(this)
        this.toggleLockUser=this.toggleLockUser.bind(this)
        this.browseImage=this.browseImage.bind(this)
        this.fetchUserData=this.fetchUserData.bind(this)
    }

    componentDidMount(){
        if (this.state.userData.details.id){
            this.fetchUserData()
        }else{
            this.setState({
                mode:{edit:true,add:true}
            })
        }
    }

    fetchUserData(){
        this.setState({
            userData:USERS.find(e=>e.details.id===+this.state.userData.details.id)
        })
    }

    toggleEditMode(action){
        if(!action){
            this.setState({
                mode:{
                    ...this.state.mode,
                    edit:!this.state.mode.edit,
                }
            })
        }else{
            this.setState({
                mode:{
                    ...this.state.mode,
                    edit:action
                }
            })
        }
    }

    browseImage(){
       alert('This function is currently unavailable')
    }

    toggleLockUser(){
        this.setState({
            ...this.state,
            status:{deactivated:false, locked:!this.state.status.locked},
        })
        this.toggleEditMode(this.state.status.locked)
    }

    render(){
        return(
         <>
        <div className="container">
            <div className="row p-0 m-0">
                <div className="col-12 mb-2 mr-3 ml-3 p-0 mt-5">
                    <UserProfileHeader toggleEditMode={this.toggleEditMode}
                                        browseImage={this.browseImage}
                                        imgURL={this.state.userData.img}
                                        employeeName={this.state.userData.details.firstName+" " + this.state.userData.details.lastName}
                                        isLocked={this.state.status}
                                        id={this.state.userData.details.id}
                                        />

                    <UserProfileDetails editMode={!this.state.mode.edit} 
                                        details={this.state.userData.details}/>

                    <UserProfileRoles editMode={!this.state.mode.edit}
                                        userRoles={this.state.userData.roles}/>

                    <UserProfileFooter editMode={!this.state.mode.edit}
                                        isLocked={this.state.status.locked}
                                        toggleLockUser={this.toggleLockUser}/>
                </div>
            </div>
        </div>  


         
                
        </>
        )
    }
}