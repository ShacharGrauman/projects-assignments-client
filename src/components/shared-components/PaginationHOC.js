    import React from 'react'
    import {api} from '../../mock-data/api'

    const styles={
        currentTab:{fontSize:'26px', pointerEvents:'none', opacity:'1'},
        disableTab:{pointerEvents:'none', opacity:'0.6'},
        styleAnchor:{color:'rgb(33, 115, 236)', cursor:"pointer"}
    }

    function PaginationHOC(Table) {
        return class extends React.Component{
            constructor(props){
                super(props);
                console.log("state hoc", props);
                this.state={
                    currentTab: 1,
                    dataValues:[],
                    numberOfTabs:Math.floor(this.props.userCount/this.props.rowsPerPage) + 1,
                }

                let url='';
                this.createPaginationBar = this.createPaginationBar.bind(this);
                this.paginationConfig = this.paginationConfig.bind(this);
                this.switchPage = this.switchPage.bind(this);
            }


            paginationConfig(state){
                this.url=state.url;
            }


            componentDidMount(){
                
                this.switchPage(1,this.props.rowsPerPage);
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
                let _tabs = [];
                console.log(this.state.numberOfTabs)
                for(let i =1 ; i<this.state.numberOfTabs+1 ; i++){
                        _tabs.push(<li onClick={()=>this.switchPage(i,this.props.rowsPerPage)} 
                                            style={this.state.currentTab === i ? styles.currentTab : null}
                                            className="page-item">
                                        <a style={styles.styleAnchor} className="page-link">{i}</a>
                                    </li>
                                );
                }
                return _tabs;
            }

            render(){
                return (
                    <>
                        <Table paginationConfig={this.paginationConfig} dataValues={this.state.dataValues}></Table>
                        <div className="d-flex justify-content-center mt-4 col-md-12">
                            <nav aria-label="table navigation">
                                <ul className="pagination">
                                    <li onClick={()=>this.switchPage(this.state.currentTab-1,this.state.rowsPerPage)}
                                        className="page-item"
                                        style={this.state.currentTab===1? styles.disableTab:null}><a style={styles.styleAnchor} className="page-link">Previous</a>
                                    </li>
                                    {this.createPaginationBar()}
                                    <li onClick={()=>this.switchPage(this.state.currentTab+1,this.state.rowsPerPage)}
                                            className="page-item"
                                            style={this.state.currentTab===this.state.numberOfTabs? styles.disableTab:null}>
                                        <a style={styles.styleAnchor} className="page-link">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </>
                )
            }

        }
    }

    export default PaginationHOC
