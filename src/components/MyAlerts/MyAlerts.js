import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import AlertCard from '../AlertCard/AlertCard'

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { ALERT_ACTIONS } from '../../redux/actions/alertActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
  alerts: state.alerts
});

class MyAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertList: [],
    }
  }
  // get user info
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  // if logged out, go home
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  // dispatch logout and then go home
  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  // edit the given alert and then remount the component
  editAlert = alertToEdit => {
    this.props.dispatch({type: ALERT_ACTIONS.EDIT_ALERT, payload: alertToEdit});

    this.componentDidMount();
  }

  // delete the selected alert and then remount the component
  deleteAlert = alert => {
    this.props.dispatch({type: ALERT_ACTIONS.DELETE_ALERT, payload: alert.id})
    
    this.componentDidMount();
  }

  render() {
    let content = null;
    
    if (this.props.user.user) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.user.username }!
          </h1>

          <div className="alertlist">
            {this.props.alerts.alerts.map((alert, i) => {
              return <AlertCard alert={alert} key={i}
                deleteAlert={this.deleteAlert} editAlert={this.editAlert}
                parentMount={this.componentDidMount}/>
            })}
          </div>

          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyAlerts);

