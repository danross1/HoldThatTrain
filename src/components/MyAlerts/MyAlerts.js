import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import Nav from '../Nav/Nav';
import AlertCard from '../AlertCard/AlertCard'

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { ALERT_ACTIONS } from '../../redux/actions/alertActions';
import { triggerLogout } from '../../redux/actions/loginActions';

// const styles = {
//   title: {
//     fontSize: 14
//   }
// }

export function removeAlert(alert) {
  console.log('in delete alert w/', alert);
    this.props.dispatch({type: ALERT_ACTIONS.DELETE_ALERT, payload: alert.id})
    
    .componentDidMount();
}

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
  componentDidMount() {
    console.log(this.props);
    
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    } //else {
    //   this.props.dispatch({ type: ALERT_ACTIONS.FETCH_ALERTS });
    // }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  editAlert = alertToEdit => {
    this.props.dispatch({type: ALERT_ACTIONS.EDIT_ALERT, payload: alertToEdit});

    this.componentDidMount();
  }

  deleteAlert = alert => {
    console.log('in delete alert w/', alert);
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
          <pre>{JSON.stringify(this.props.alerts)}</pre>

          {this.props.alerts.alerts.map((alert, i) => {
            return <AlertCard alert={alert} key={i} 
              deleteAlert={this.deleteAlert} editAlert={this.editAlert}/>
          })}

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

