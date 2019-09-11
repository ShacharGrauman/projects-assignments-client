import React from 'react';
import ListRoles from '../shared-components/list-roles'


export default class UserProfileDetails extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userRoles:['Employee','Intern'],
            non_userRoles:['Employee','Manager','HR manager']
        }

        this.addRoles=this.addRoles.bind(this)
    }


    addRoles(e){
        document.getElementById('userRoles');
        console.log('hello');

    }

    render(){
        return(<>
        <div className="card mb-2">
        
            <h5 className="text-center mt-3 mb-1">Roles</h5>
            <div className="d-flex justify-content-around">
                <div className="w-75 m-2">
                    <ListRoles disabled={this.props.editMode} options={this.state.userRoles} id="userRoles"/>
                </div>
                {!this.props.editMode &&
                <>
                    <div className="d-flex flex-column justify-content-center">
                        <button className="btn btn-sm btn-outline-success m-1" onClick={this.addRoles}>Add <i className="fas fa-arrow-right"></i></button>
                        <button className="btn btn-sm btn-outline-danger m-1"><i className="fas fa-arrow-left"></i> Remove</button>
                    </div>  
                    <div className="w-75 m-2">
                        <ListRoles disabled={this.props.editMode} options={this.state.non_userRoles}/>
                    </div>
                </>}
                
            </div>
        </div>
        
        </>)
    }
}