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
            countries:[],
            managers:[]
        }
    }

    async componentDidMount(){
        const result = await api.getAllData()
        await this.setState({
            departments:result.departments,
            worksites:result.worksites,
            roles:result.roles,
            countries:result.countries,
            managers:result.managers
        })
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