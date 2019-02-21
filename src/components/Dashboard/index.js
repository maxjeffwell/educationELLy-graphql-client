import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from '../Landing';
// import Students from '../Students';
// import AuthRequired from '../AuthRequired';

const Dashboard = () => (
  <div id="dashboard">
      <Switch>
        <Route exact path='/' component={Landing} />
        {/*<Route exact path='/' component={Students} />*/}
      </Switch>
  </div>
);

export default Dashboard;
