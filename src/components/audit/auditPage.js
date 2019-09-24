import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";



import {api} from '../../mock-data/api'


const styleTab={fontSize:'30px', pointerEvents:'none' , opacity:'0.8'}
const disableClick={pointerEvents:'none', opacity:'0.8'}

const AdvancedSearchStyle = {
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline"

}
const AdvancedSearchOptionsStyle = {
    display: "none"
}

class Audit extends React.Component {

    constructor() {
        super();
        this.state = {
            startDate: '',
            endDate: '',
            employee:0,
            actionsFilter:'',
            actions: [],
            pagination:{
                numberOfPages:7,
                rowsPerPage:10,
                currentPage:1
            }

        };

        this.searchAudit = this.searchAudit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.switchPage = this.switchPage.bind(this)

        this.handleChange = date => {
            this.setState({startDate: date});
        };

        this.handleChange2 = date => {
            this.setState({endDate: date});
        };
    }
    onChange() { (date) => this.setState({ date }) }

    componentDidMount() {
        api.getCount('countEmployees')
        .then(res=>this.setState(
            {pagination:{
                ...this.state.pagination,
                numberOfPages:Math.ceil(res/this.state.pagination.rowsPerPage)+1
            }}
            )
        )
        this.switchPage(1)
    }

    switchPage(pageNumber){
        api.getAuditData(pageNumber,this.state.pagination.rowsPerPage)
        .then(actions=>this.setState({actions, pagination:{...this.state.pagination, currentPage:pageNumber}}));
    }

    handleInputChange({target:{name,value}}){
        this.setState({[name]:value})
    }

    async searchAudit(e){
        e.preventDefault()
        const {startDate, endDate, actionsFilter, employee}=this.state
        const fromDate= startDate? `${startDate.getUTCFullYear()}-${startDate.getUTCMonth()}-${startDate.getUTCDate()}`:''
        const toDate=endDate? `${endDate.getUTCFullYear()}-${endDate.getUTCMonth()}-${endDate.getUTCDate()}`:''
        
        //if all search fields are empty, run the componentDidMount again
        !startDate&& !endDate&& !actionsFilter&& !employee ?
            this.componentDidMount()
            : //if filters are applied, fetch the data from the backend
            await api.auditSearch(fromDate, toDate, actionsFilter, employee)
                .then(actions=>this.setState({actions}, ()=>console.log(actions)));
            
    }
        
    

    showAdvancedSearch() {
        const advancedSearchOptions = document.querySelector('#advancedSearchOptions');

        if (advancedSearchOptions.style.display == "flex") {
            advancedSearchOptions.style.display = "none";

        }
        else {
            advancedSearchOptions.style.display = "flex";
        }
    }


    
    
    render() {

        let tabs=[]
        for(let i = 1 ; i < this.state.pagination.numberOfPages ;i++){
            tabs.push(<li key={i} 
                                className="page-item" 
                                style={this.state.pagination.currentPage===i? styleTab:null}
                                onClick={()=>this.switchPage(i)}>
                        <a className="page-link" href="#">{i}</a>
                    </li>)
        }
        return (
            <>
                <div className="mt-4">
                    <h2 className="text-center">Audit</h2>
                </div>

            {/* SEARCH/FILTER INPUTS  */}

                <div className=" m-auto mt-5 col-10">
                    <form>
                            <div >
                                <a style={AdvancedSearchStyle} className="justify-content-md-center mr-2" onClick={this.showAdvancedSearch}>Search</a>
                            </div>
                        <div className="form-row m-auto d-flex align-items-center" >
                            <div id="advancedSearchOptions" style={AdvancedSearchOptionsStyle}>
                                <div className="row align-items-end ml-3">
                                    <div className="col-lg-3 col-sm-6 col-xs-12  p-0" >
                                        <h6 className="mb-0">From:</h6>
                                        <DatePicker
                                            className="form-control "
                                            name="startDate"
                                            dateFormat='dd/MM/yyyy'
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-xs-12 p-0">
                                        <h6 className="mb-0">To:</h6>
                                        <DatePicker
                                            className="form-control"
                                            name="endDate"  
                                            dateFormat='dd/MM/yyyy'
                                            selected={this.state.endDate}
                                            onChange={this.handleChange2}
                                        // defaultValue={this.state.endDate.value}
                                        />
                                    </div>
                                    <div className="col-lg-3 col-sm-6 col-xs-12 p-0" >
                                        <h6 className="mb-0">Emp. No:</h6>
                                        <input
                                            style={{ width: 'auto' }}
                                            type="number"
                                            className="form-control "
                                            placeholder="Search by Employee No."
                                            defaultValue={this.state.employee.value}
                                            onChange={this.handleInputChange}
                                            name="employee"/>
                                    </div>

                                    <div className="col-lg-3 col-sm-6 col-xs-12 p-0" >
                                        <h6 className="mb-0">Activity:</h6>
                                        <div className="form-check-inline m-0 align-items-end">
                                            <select onChange={this.handleInputChange} name="actionsFilter" className="form-control " style={{ cursor: "pointer", width: 'auto', minWidth: '220px' }}>
                                                <option value="all actions">All Activities</option>
                                                <option value="Login">Login</option>
                                                <option value="Login Failure">Login Failure</option>
                                                <option value="Add User">Add User</option>
                                                <option value="Delete Role">Delete Role</option>
                                            </select>
                                            <button onClick={this.searchAudit} className=" btn btn-outline-success mx-1" style={{ borderRadius: "50%" }}>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* A component to build the table */}
                <div className=" d-flex justify-content-center mt-3" style={{ height: 'auto' }}>
                    <table className="table table-sm col-lg-8 table-hover text-center">
                        <thead className="thead" id="userAuditRow">
                            <tr>
                                <th scope="col">Employee No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.actions.map((action,i) => {
                                return (
                                    <tr key={i}>
                                        <td>{action.audit.employeeNumber}</td>
                                        <td>{action.firstname + ' ' + action.lastname}</td>
                                        <td>{action.audit.dateTime}</td>
                                        <td>{action.time}</td>
                                        <td>{action.audit.activity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>



                </div>
                    <nav aria-label="Search results pages">
                        <ul className="pagination justify-content-center">
                            <li style={this.state.pagination.currentPage==1?disableClick:null} onClick={()=>this.switchPage(this.state.pagination.currentPage-1)} className="page-item"><a className="page-link" href="#">Previous</a></li>
                            {tabs}
                            <li style={this.state.pagination.currentPage==this.state.pagination.numberOfPages-1?disableClick:null} onClick={()=>this.switchPage(this.state.pagination.currentPage+1)} className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>

              

            </>
        );
    }

}




export default Audit