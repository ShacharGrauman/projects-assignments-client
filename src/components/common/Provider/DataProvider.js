import React, { Component } from 'react'
import {api} from '../../../mock-data/api'

export const DataContext = React.createContext() 

export class DataProvider extends Component {
    constructor(){
        super()
        this.state={
            data:{
                departments:[],
                worksites:[],
                roles:[],
                countries:[],
                managers:[],
                skills: [],
            },
            authValues:{},
            isLogged:false
        }

        this.initAuth = this.initAuth.bind(this)
    }

    async initAuth(auth){
        const result = await api.getAllData()
        await this.setState({
            data:{
                departments:result.departments,
                worksites:result.worksites,
                roles:result.roles,
                countries:result.countries,
                managers:result.managers,
                skills: result.skills
            },
            authValues:auth,
            isLogged:true
        });

    }




    async componentDidMount(){
        
    }
    
    render() {
        return (
            <DataContext.Provider value={{data:this.state,initAuth:this.initAuth}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}

export default DataProvider