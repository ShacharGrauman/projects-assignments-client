import React from 'react';


export default class userAuditRow extends React.Component{
    render(){
        return(
            <>
                <tr>
                    <td>{user.userId}</td>
                    <td>{user.fullname}</td>
                    <td>{user.date}</td>
                    <td>{user.time}</td>
                    <td>{user.activity}</td>
                </tr>   
            </>
        )
    }
}