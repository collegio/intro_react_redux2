import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ActivityDashboardPage from '../components/ActivityDashboardPage';
import AddActivityPage from '../components/AddActivityPage';
import EditActivityPage from '../components/EditActivityPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const MainRouter = (props) => {
    return (
        <BrowserRouter>
            <div>
                <Header>Activity Tracker</Header>
                <Switch>
                    <Route path="/" component={ActivityDashboardPage} exact={true} />
                    <Route path="/create" component={AddActivityPage} exact={true} />
                    <Route path="/edit/:id/" component={EditActivityPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default MainRouter;