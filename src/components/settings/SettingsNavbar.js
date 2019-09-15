import React from 'react';
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class SettingsNavbar extends React.Component{
    render(){
        return(<>
        <div className="my-4">
            <Nav variant="tabs" defaultActiveKey="" justify >
                <Nav.Item>
                    <Link to="/settings/add/roles">Roles</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/settings/add/department">Departments</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/settings/add/worksite">Worksite</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/settings/add/project">Project</Link>
                </Nav.Item>
            </Nav>
        </div>
                
        </>
        )
    }
}