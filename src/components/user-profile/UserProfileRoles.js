import React from 'react';
import ListComponent from '../shared-components/List'
import {UserRoles} from '../../mock-data/mock-data'
import {DataContext} from '../common/Provider/DataProvider'
import {AllRoles} from '../../mock-data/mock-data'


export default class UserProfileRoles extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userRoles : UserRoles.map(({name})=>name),
            NonUserRoles : AllRoles.map(({name})=>name)
                                .filter(name=>!UserRoles.map(({name})=>name).includes(name)),
            }
        
        this.addRoles=this.addRoles.bind(this)
    }


    addRoles(e){
        document.getElementById('userRoles');
    }
    
    componentDidMount(){
    }

    render(){
        this.allRoles=this.context.roles
        return(<>
        <div className="card mb-2">
        
            <h5 className="text-center mt-3 mb-1">Roles</h5>
            <div className="d-flex justify-content-around">
                
                    {!this.props.editMode &&
                    <>
                        <div className="w-75 m-2">
                                <ListComponent disabled={this.props.editMode}
                                options={this.state.NonUserRoles} 
                                title={"All Roles"}
                                id="userRoles"/>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <button className="btn btn-sm btn-outline-success m-1" onClick={this.addRoles}>Add <i className="fas fa-arrow-right"></i></button>
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

UserProfileRoles.contextType=DataContext;