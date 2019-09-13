import React from 'react';

export default class UserProfileFooter extends React.Component{
    render(){
        return(
            <>
                <div className="card position-relative d-flex flex-row bd-highlight p-2 mb-2" style={{bottom:"0"}}>
                    {
                        this.props.isLocked ?
                    <button className="btn btn-info ml-auto mr-2" onClick={this.props.toggleLockUser}>Activate</button>
                    :
                    <>
                        <div className=" ">
                            {this.props.view && <button className="ml-2 btn btn-warning">Options</button>}
                        </div>

                        <button className='ml-auto btn btn-danger mr-2'>Cancel</button>
                        {this.props.view && <button className="btn btn-secondary mr-2" onClick={this.props.toggleLockUser}>Lock User</button>}
                        <div className="mr-2">
                            {this.props.view?
                            <button className="btn btn-success">Apply</button>
                            :
                            <button className="btn btn-success">Finish</button>
                            }
                        </div>
                    </>
                    }

                </div>
            </>
        )
    }
}