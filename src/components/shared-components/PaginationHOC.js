    import React from 'react'
    import {api} from '../../mock-data/api'

    const styles={
        currentTab:{fontSize:'26px', pointerEvents:'none', opacity:'1'},
        disableTab:{pointerEvents:'none', opacity:'0.6'},
        styleAnchor:{color:'rgb(33, 115, 236)', cursor:"pointer"}
    }

    function PaginationHOC(Table) {
        return class extends React.Component{
            constructor(){
                super();
                this.state={
                    currentTab: 1,
                    rowsPerPage:20,
                    dataValues:[],
                    numberOfTabs:1,
                    userCount:1
                }

                let url='';

                this.paginationConfig = this.paginationConfig.bind(this)
                this.switchPage = this.switchPage.bind(this)
            }


            async paginationConfig(state){
                this.url=state.url;
            }


            componentDidMount(){
                this.setState({
                   userCount:this.props.userCount
                }, this.setState({
                    numberOfTabs:Math.floor(this.state.userCount/this.state.rowsPerPage)+1
                }, ()=>this.switchPage(1,this.state.rowsPerPage)))
                
            }


            async switchPage(pageNumber, limit){
                //api.getDATA ///////////////////////////////////
                const result = await api.getData(this.url+`?page=${pageNumber}&limit=${limit}`)
                await this.setState({
                    dataValues:result,
                   currentTab:pageNumber
                })
            }

            createPaginationBar (){
                let _tabs =[]
                for(let i =1 ; i<this.state.numberOfTabs+2 ; i++){
                    _tabs.push(<li onClick={()=>this.switchPage(i,this.state.rowsPerPage)} 
                                    style={this.state.currentTab === i ? styles.currentTab : null}
                                    className="page-item"><a style={styles.styleAnchor} className="page-link">{i}</a></li>)
                }
                return _tabs;
            }

            render(){
                return(
                    <>
                        <Table paginationConfig={this.paginationConfig} dataValues={this.state.dataValues}></Table>
                        <div className="d-flex justify-content-center mt-4 col-md-12">
                            <nav aria-label="table navigation">
                                <ul className="pagination">
                                    <li onClick={()=>this.switchPage(this.state.currentTab-1,this.state.rowsPerPage)}
                                        className="page-item"
                                        style={this.state.currentTab===1? styles.disableTab:null}><a style={styles.styleAnchor} className="page-link">Previous</a></li>
                                    {this.createPaginationBar()}
                                    <li onClick={()=>this.switchPage(this.state.currentTab+1,this.state.rowsPerPage)}
                                        className="page-item"
                                        style={this.state.currentTab===this.state.numberOfTabs+1? styles.disableTab:null}><a style={styles.styleAnchor} className="page-link">Next</a></li>
                                    

                                </ul>

                            </nav>
                        </div>
                    </>
                )
            }

        }
    }

    export default PaginationHOC
