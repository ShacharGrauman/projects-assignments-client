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
            rowsPerPage : 10
        }

        this.paginationBar = this.paginationBar.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
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
        for(let i =1 ; i< Math.floor((this.props.usersCount - 1)/this.state.rowsPerPage)+2 ; i++){
            paginationTab.push(<li onClick={()=>this.switchPage(i,this.state.rowsPerPage)} 
                            style={this.state.currentTab === i ? styles.currentTab : null}
                            className="page-item"
                            key={i}><a style={styles.styleAnchor} className="page-link">{i}</a></li>)
        }
        return paginationTab;
    }

    async changePageSize(){
        let e = document.getElementById('pageSizeSelection');
        
        if(!e.options[e.selectedIndex].value == ""){
            await this.setState({
                rowsPerPage : e.options[e.selectedIndex].value
            }, ()=> this.switchPage(this.state.currentTab, this.state.rowsPerPage));
            
        }
    }

    render(){
        return(
            <nav aria-label="...">
                <div className="offset-col-4" style={{marginLeft : "50%"}}>
                <ul className="pagination">
                    <li className="page-item" style={this.state.currentTab===1? styles.disableTab:null}>
                        <a className="page-link"
                            onClick={()=>this.switchPage(this.state.currentTab-1,this.state.rowsPerPage)} 
                            style={styles.styleAnchor} >Previous</a>
                    </li>
                    
                    {this.paginationBar()}
                    <li className="page-item" 
                        style={this.state.currentTab===(Math.floor((this.props.usersCount-1)/this.state.rowsPerPage)+1)? styles.disableTab : null}>
                        <a className="page-link" 
                            onClick={()=>{this.switchPage(this.state.currentTab+1,this.state.rowsPerPage)}}
                            style={styles.styleAnchor}>Next</a>
                    </li>
                </ul>
                <select id="pageSizeSelection" onChange={this.changePageSize}>
                    <option value="">Page Size</option>
                    <option value="4" >4</option>
                    <option value="10" >10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                </div>
            </nav>
        );
    }
}