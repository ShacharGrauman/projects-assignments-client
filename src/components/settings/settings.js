import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import SettingsNavbar from './SettingsNavbar';
import AddDepartment from "./AddDepartment";
import AddRole from "./AddRole";
import AddProject from "./AddProject";
import AddWorksite from "./AddWorksite";


export default class Settings extends React.Component{
    render(){
        return(<>
            <BrowserRouter>
                <div>
                <SettingsNavbar />
                    <Switch>
                        <Route path="/settings/add/roles" component={AddRole}/>
                        <Route path="/settings/add/department" component={AddDepartment}/>
                        <Route path="/settings/add/worksite" component={AddWorksite}/>
                        <Route path="/settings/add/project" component={AddProject}/>
                    </Switch>
                </div>
            </BrowserRouter>
              
        </>)
    }
}