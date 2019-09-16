import React, { Component } from 'react'
import {api} from '../../../mock-data/api'
export const DataContext = React.createContext() 

export class DataProvider extends Component {
    constructor(){
        super()
        this.state={
            departments:[],
            worksites:[],
            roles:[],
            countries:[]
        }
    }
    componentDidMount(){
        api.getAllData().then(res=>this.setState({
            departments:res.departments,
            worksites:res.worksites,
            roles:res.roles,
            countries:res.countries
        }))
    }
    
    render() {
        return (
            <DataContext.Provider value={this.state}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

export default DataProvider
