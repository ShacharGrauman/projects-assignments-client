import React from 'react';

export default class ListComponent extends React.Component{
    constructor(props){
        super(props)

    }

    // Using this component:

    // Pass a title for the list(string), options(array of strings) 
    // and disabled (boolean) in the props 

    render(){
        return(<>
            <div className="form-group">
                <p className="text-center mb-1">{this.props.title}</p>
                <select id={this.props.id}
                        multiple 
                        className="form-control"   
                        disabled={this.props.disabled}>
                    {this.props.options.map((option,i)=>(<option id={option.id} key={i}>{option.name}</option>))}
                </select>
            </div>
        </>)
    }
} 