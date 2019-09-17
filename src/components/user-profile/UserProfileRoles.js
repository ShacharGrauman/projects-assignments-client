import React from 'react';
import ListComponent from '../shared-components/List'
import {UserRoles} from '../../mock-data/mock-data'
import {api} from '../../mock-data/api'


export default class UserProfileRoles extends React.Component{

    constructor(props){
        super(props);
        this.state={
            allRoles:[],
            userRoles : UserRoles.map(({name})=>name),
            }
        
    }

    async componentDidMount(){
        const allRoles = await api.getRoles();
        this.setState({allRoles});
    }

    render(){
        return(<>
        <div className="card mb-2">
        
            <h5 className="text-center mt-3 mb-1">Roles</h5>
            <div className="d-flex justify-content-around">
                
                    {!this.props.editMode &&
                    <>
                        <div className="w-75 m-2">
                                <ListComponent disabled={this.props.editMode}
                                options={this.state.allRoles.map(({name})=>name)
                                            .filter(name=>!this.state.userRoles.map(({name})=>name).includes(name))} 
                                title={"All Roles"}
                                id="userRoles"/>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <button className="btn btn-sm btn-outline-success m-1">Add <i className="fas fa-arrow-right"></i></button>
                            <button className="btn btn-sm btn-outline-danger m-1"><i className="fas fa-arrow-left"></i> Remove</button>
                        </div>  
                    </>}
                    <div className="w-75 m-2">
                        <ListComponent disabled={this.props.editMode} 
                                        options={this.state.userRoles}
                                        title={"User Roles"}
                                        />
                    </div>
                    
                
            </div>
        </div>
        
        </>)
    }
}