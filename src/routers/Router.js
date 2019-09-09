import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Home from '../components/common/Home'
import UserProfile from '../components/user-profile/UserProfile'
import UsersListPage from '../components/users-list/usersListPage'

export default ()=>(
<BrowserRouter>
    <div>
        <Navbar />
        <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/users-list/" component={UsersListPage}/>
            <Route path="/user-profile/:id" component={UserProfile}/>
        </Switch>
        <Footer />
    </div>
</BrowserRouter>
);