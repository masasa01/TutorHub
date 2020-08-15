import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import AcceptedJobs from './DashboardViews/AcceptedJobs';
import AvailableJobs from './DashboardViews/AvailableJobs';
import CreatedJobs from './DashboardViews/CreatedJobs';
import PreviousJobs from './DashboardViews/PreviousJobs';

class Dashboard extends Component {

    render() {
        return(
            <Tabs defaultActiveKey="available" id="uncontrolled-tab-example">
                <Tab eventKey="available" title="Available Jobs">
                    <AvailableJobs />
                </Tab>
                <Tab eventKey="accepted" title="Accepted Jobs">
                    <AcceptedJobs />
                </Tab>
                <Tab eventKey="created" title="Created Jobs">
                    <CreatedJobs />
                </Tab>
                <Tab eventKey="previous" title="Previous Jobs">
                    <PreviousJobs />
                </Tab>
            </Tabs>
        )
    }
}

export default Dashboard;