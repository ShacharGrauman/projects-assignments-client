import React from 'react';
import ListComponent from '../shared-components/List'
import {api} from '../../mock-data/api'


export default class UserProfileRoles extends React.Component{

    constructor(props){
        super(props);
        this.state={
            allRoles:[],
            userRoles:[]
            }
            this.toggleRole= this.toggleRole.bind(this)
    }
    
    async componentDidMount(){
        const allRoles = await api.getRoles();
         this.setState({allRoles});
    }

    toggleRole(event){
        let rolesList=[];
        if(event.target.getAttribute('id')==='btn_add'){
            rolesList = document.getElementById('allRoles')
            
        }else if(event.target.getAttribute('id')==='btn_remove'){
            rolesList = document.getElementById('userRoles')
            
        }
        
        const rolesToManipulate = [...rolesList.options]
                            .filter(option => option.selected)
                            .map(selectedOption=>{
                                return {id:+selectedOption.id, name:selectedOption.innerText}});
       {rolesToManipulate.length>0 && this.props.toggleRole(rolesToManipulate)}
        
    }
    
    render(){
        return(<>
        <div className="card mb-2 p-2">
        
            <h5 className="text-center mt-3 mb-1">Roles</h5>
            <div className="d-flex justify-content-around">
                
                    {!this.props.editMode &&
                    <>
                        <div className="w-75 m-2">
                                <ListComponent disabled={this.props.editMode}
                                options={this.props.non_userRoles} 
                                title={"All Roles"}
                                id="allRoles"/>
                        </div>
                        
                        
                        <div className="d-flex flex-column justify-content-center">
                            <button className="btn btn-sm btn-outline-success m-1" id="btn_add" onClick={this.toggleRole}>Add <i className="fas fa-arrow-right"></i></button>
                            <button className="btn btn-sm btn-outline-danger m-1" id="btn_remove" onClick={this.toggleRole}><i className="fas fa-arrow-left"></i> Remove</button>
                        </div>  
                    </>}
                    <div className="w-75 m-2">
                        <ListComponent disabled={this.props.editMode} 
                                        options={this.props.userRoles}
                                        title={"User Roles"}
                                        id="userRoles"
                                        />
                    </div>
                    
                
            </div>
        </div>
        
        </>)
    }
}