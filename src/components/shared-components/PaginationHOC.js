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
                    url:'',
                    numberOfTabs:3,
                    currentTab:1,
                    rowsPerPage:50,
                    dataValues:[]
                }

                this.paginationConfig = this.paginationConfig.bind(this)
                this.switchPage = this.switchPage.bind(this)
            }


            paginationConfig(state){
                this.setState({state})
            }


            async switchPage(pageNumber){
                //api.getDATA ///////////////////////////////////

                const result = await api.getUsersList()
                await this.setState({
                    dataValues:result,
                   currentTab:pageNumber
                }, ()=>console.log(this.state.dataValues))
            }

            createPaginationBar (){
                let _tabs =[]
                for(let i =1 ; i<this.state.numberOfTabs+1 ; i++){
                    _tabs.push(<li onClick={()=>this.switchPage(i)} 
                                    style={this.state.currentTab === i ? styles.currentTab : null}
                                    className="page-item"><a style={styles.styleAnchor} className="page-link">{i}</a></li>)
                }
                return _tabs;
            }

            render(){
                return(
                    <>
                        <Table paginationConfig={this.paginationConfig}></Table>
                        <div className="d-flex justify-content-center mt-4 col-md-12">
                            <nav aria-label="table navigation">
                                <ul className="pagination">
                                    <li onClick={()=>this.switchPage(this.state.currentTab-1)}
                                        className="page-item"
                                        style={this.state.currentTab===1? styles.disableTab:null}><a style={styles.styleAnchor} className="page-link">Previous</a></li>
                                    {this.createPaginationBar()}
                                    <li onClick={()=>this.switchPage(this.state.currentTab+1)}
                                        className="page-item"
                                        style={this.state.currentTab===this.state.numberOfTabs? styles.disableTab:null}><a style={styles.styleAnchor} className="page-link">Next</a></li>
                                    

                                </ul>

                            </nav>
                        </div>
                    </>
                )
            }

        }
    }

    export default PaginationHOC
