import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import MyAlerts from './components/MyAlerts/MyAlerts';
import MyAccount from './components/MyAccount/MyAccount';
import LandingPage from './components/LandingPage/LandingPage';
import CreateAlert from './components/CreateAlert/CreateAlert';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="HoldThatTrain!" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/alerts"
          component={MyAlerts}
        />
        <Route
          path="/account"
          component={MyAccount}
        />
        <Route
          path="/home"
          component={LandingPage}
        />
        <Route
          path="/create"
          component={CreateAlert}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
