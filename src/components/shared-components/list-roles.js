import React from 'react';

export default class ListRoles extends React.Component{
    constructor(props){
        super(props)

    }

    // Using this component:

    // Pass a title for the list(string), options(array of strings) 
    // and disabled (boolean) in the props 

    render(){
        return(<>
            <div className="form-group">
                <label>{this.props.title}</label>
                <select multiple 
                        className="form-control"   
                        disabled={this.props.disabled}>
                    {this.props.options.map((option,i)=>(<option key={i}>{option}</option>))}
                </select>
            </div>
        </>)
    }
} 