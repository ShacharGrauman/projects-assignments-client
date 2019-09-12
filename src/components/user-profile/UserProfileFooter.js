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
                
                        <button className="btn btn-warning ml-2">Options</button>

                        <button className='ml-auto btn btn-danger mr-2'>Cancel</button>
                        <button className="btn btn-secondary mr-2" onClick={this.props.toggleLockUser}>Lock User</button>
                        <button className="btn btn-success mr-2">Apply</button>
                    </>
                    }

                </div>
            </>
        )
    }
}