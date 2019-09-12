import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Home from '../components/common/Home'
import PageNotFound from '../components/common/PageNotFound';

import UserProfile from '../components/user-profile/UserProfile'
import UsersListPage from '../components/users-list/usersListPage'
import Audit from '../components/audit/audit'

export default ()=>(
<BrowserRouter>
    <div>
        <Navbar />
        <Switch>
            <Route path="/" component={Home} exact={true}/>
            <Route path="/users-list/" component={UsersListPage}/>
            <Route path="/user-profile/:id" component={UserProfile}/>
            <Route path="/user-profile/addUser" component={UserProfile}/>
            <Route path="/audit" component={Audit}/>
            <Route component={PageNotFound}/>
        </Switch>
        <Footer />
    </div>
</BrowserRouter>
);