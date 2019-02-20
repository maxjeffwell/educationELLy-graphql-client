import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation';
import Landing from '../Landing';

const Dashboard = ({ isToggled }) => (
  <div id="dashboard">
    <div id="main" className={isToggled ? 'toggled' : ''}>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Landing} />
      </Switch>
    </div>
  </div>
);

export default Dashboard;
