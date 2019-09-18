import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {MockDataStatus} from '../../mock-data/Data';


export default class UsersStatus extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
                <div className="row mb-2 d-flex align-items-stretch justify-content-between">
                    {
                        MockDataStatus.map(data => 
                        <>
                            <div className="col-sm-3 w-100">
                                <div className="card text-center my-1 p-2 shadow" style={{backgroundColor : "rgb(220,220,220)"}}>
                                    <div className="card-body p-1">
                                        <FontAwesomeIcon 
                                            icon={data.iconName}
                                            size="4x" style={{color:'rgb(80,80,80)'}}
                                            >
                                        </FontAwesomeIcon>
                                        <p className="card-text my-0">{data.titleName}</p>
                                        <hr className="my-1"></hr>
                                        <span><h4>{this.props.userStatuses[data.variable]}</h4></span>
                                    </div>
                                </div>
                            </div>
                        </>
                        )
                    }
                </div>
        );
    }
}