import React from 'react';
import {api} from '../../mock-data/api';

const styles={
    currentTab:{fontSize:'26px', pointerEvents:'none', opacity:'1'},
    disableTab:{pointerEvents:'none', opacity:'0.6'},
    styleAnchor:{color:'rgb(33, 115, 236)', cursor:"pointer"}
}

export default class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            currentTab : 1,

        }

        this.paginationBar = this.paginationBar.bind(this);
    }

    async switchPage(pageNumber, limit){
        //api.getDATA ///////////////////////////////////
        const url = this.props.url + `page=${pageNumber}&limit=${limit}`;
        const result = await api.getData(url);
        await this.setState({
           currentTab:pageNumber
        });
        this.props.changeUserList(result);
    }

    paginationBar (){
        let paginationTab = [];
        for(let i =1 ; i< Math.floor((this.props.usersCount - 1)/this.props.rowsPerPage)+2 ; i++){
            paginationTab.push(<li onClick={()=>this.switchPage(i,this.props.rowsPerPage)} 
                            style={this.state.currentTab === i ? styles.currentTab : null}
                            className="page-item"
                            key={i}><a style={styles.styleAnchor} className="page-link">{i}</a></li>)
        }
        return paginationTab;
    }

    render(){
        return(
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item" style={this.state.currentTab===1? styles.disableTab:null}>
                        <a className="page-link"
                            onClick={()=>this.switchPage(this.state.currentTab-1,this.props.rowsPerPage)} 
                            style={styles.styleAnchor} >Previous</a>
                    </li>
                    
                    {this.paginationBar()}
                    <li className="page-item" 
                        style={this.state.currentTab===(Math.floor((this.props.usersCount-1)/this.props.rowsPerPage)+1)? styles.disableTab : null}>
                        <a className="page-link" 
                            onClick={()=>{this.switchPage(this.state.currentTab+1,this.props.rowsPerPage)}}
                            style={styles.styleAnchor}>Next</a>
                    </li>
                </ul>
            </nav>
        );
    }
}