import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function UserProfile({match}){
    return<>
            <h2>Hello. This profile belongs to User {match.params.id}</h2>
            <button className="btn btn-outline-info"><Link to="/users-list">Back</Link></button>
        </>
}
export default UserProfile;