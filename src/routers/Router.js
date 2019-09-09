import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Home from '../components/common/Home'
import UserProfile from '../components/users-list/UserProfile'
import UsersList from '../components/users-list/UsersList'

export default ()=>(
<BrowserRouter>
    <div>
        <Navbar />
        <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/users-list/" component={UsersList}/>
            <Route path="/user-profile/:id" component={UserProfile}/>
        </Switch>
        <Footer />
    </div>
</BrowserRouter>
);