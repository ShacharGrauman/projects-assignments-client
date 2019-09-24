import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InputErrors from '../shared-components/InputErrors'

export default class UserProfileFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message_title:'',
            message_body:'', 
        }

        this.sendEmail = this.sendEmail.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange({target:{name, value}}){
        this.setState({[name]:value})
    }

    sendEmail() {
        this.props.sendEmail(this.state.message_title, this.state.message_body)
    }


    render() {
        return (
            <>
            {!this.props.isDeactivated &&
                <div>
                <div className="card position-relative d-flex flex-row bd-highlight p-2 mb-2" style={{ bottom: "0" }}>
                    {
                        this.props.isLocked?
                            <button className="btn btn-info ml-auto mr-2" onClick={this.props.unlockUser}>Activate</button>
                            :
                            <>
                                <div className=" ">
                                    {!this.props.addUserForm &&


                                        <div className="btn-group dropup" style={{ cursor: 'pointer' }}>
                                            <button type="button" className="btn btn-secondary dropdown-toggle ml-2 btn btn-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Options
                                </button>
                                            <div className="dropdown-menu">
                                                <h6 className="dropdown-item" onClick={this.props.deactivateUser}>Deactivate User</h6>
                                                <h6 className="dropdown-item" data-toggle="modal" data-target="#exampleModal">Direct Message</h6>
                                                <h6 className="dropdown-item" >Reset Password</h6>
                                            </div>
                                        </div>
                                    }
                                </div>

                                <Link className="ml-auto mr-2" to="/users-list" style={{ color: 'white', textDecoration: 'none' }}><button className='btn btn-danger'>Cancel</button></Link>
                                <div className="mr-2">
                                    {this.props.addUserForm ?
                                        <button className="btn btn-success" onClick={this.props.addUser}>Finish</button>
                                        :
                                        <button className="btn btn-success" onClick={this.props.editUser}>Apply</button>
                                    }
                                </div>
                            </>
                    }

                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleSendEmail" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="p-2 mx-2">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h5 className="mt-3 modal-title text-center" id="exampleModalLabel">Direct Message to {this.props.name}</h5>
                            </div>
                            <div className="modal-body">

                                <div className="col-xs-12 col-10 m-auto p-1">
                                    <div className="row">
                                        <label htmlFor="title_" className="mb-0">Title</label>
                                        <div className="input-group mb-3">
                                            <input type="text"
                                                id="title_"
                                                className="form-control"
                                                placeholder="Title"
                                                aria-label="Title"
                                                name="message_title"
                                                style={{ fontSize: '20px', color: 'black' }}
                                                onChange={this.handleChange}
                                                aria-describedby="title"></input>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <label htmlFor="emailBody" className="mb-0">Message</label>
                                        <div className="input-group">
                                            <textarea
                                                id="emailBody"
                                                style={{ minHeight: '200px' }}
                                                className="form-control"
                                                aria-label="With textarea"
                                                name="message_body"
                                                placeholder="Message Body"
                                                onChange={this.handleChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                <button type="button" 
                                className="btn btn-success" 
                                data-dismiss="modal"
                                onClick={this.sendEmail}
                                disabled={!this.state.message_body}>Send Message</button>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
                }
            </>
        )
    }
}