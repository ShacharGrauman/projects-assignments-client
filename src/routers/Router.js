import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Home from "../components/common/Home";
import PageNotFound from "../components/common/PageNotFound";

import UserProfile from "../components/user-profile/UserProfile";
import UsersListPage from "../components/users-list/UsersListPage";
import Audit from "../components/audit/auditPage";
import Roles from "../components/roles/roles";
import MyTeamTable from "../components/Assigments/MyTeamTable";
import Login from "../components/login/login";
import Settings from "../components/settings/settings";
import Projects from "../components/Assigments/Projects";
import MyOwnSkills from "../components/skills/MyOwnSkills";

export default () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/users-list/" component={UsersListPage} />
        <Route path="/user-profile/:id" component={UserProfile} />
        <Route path="/user-profile/addUser" component={UserProfile} />
        <Route path="/audit" component={Audit} />
        <Route path="/roles" component={Roles} />
        <Route path="/settings" component={Settings} />
        <Route path="/login" component={Login} />
        <Route path="/my-team/" component={MyTeamTable} />
        <Route path="/my-skills/:id" component={MyOwnSkills} />

        <Route path="/projects/" component={Projects} />
        <Route path="/assign-history/" component={Projects} />

        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
