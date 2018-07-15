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

const mapStateToProps = state => ({
  user: state.user,
  alerts: state.alerts
});

class MyAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertList: [],
      edit: false
    }
  }
  componentDidMount() {
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

          {/* {this.props.alerts.alerts.map((alert, i) => {
            return (
              <Card key={i}>
                <CardHeader title={alert.name} />
                <CardContent>
                  <div>{alert.stop}</div>
                  <div>{alert.direction}</div>
                  <div>{alert.when_to_alert} min before</div>
                </CardContent>
                <CardActions>
                  <Button onClick={() => this.deleteAlert(alert)} variant="contained" size="small">Delete</Button>
                  <Button onClick={() => this.editAlert(alert)} variant="contained" size="small">Edit</Button>
                  <Button variant="contained" size="small">Activate</Button>
                </CardActions>
              </Card>
            )
          })} */}

          {this.props.alerts.alerts.map((alert, i) => {
            return <AlertCard alert={alert} key={i}/>
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

