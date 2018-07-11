import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

// const styles = {
//   title: {
//     fontSize: 14
//   }
// }

const mapStateToProps = state => ({
  user: state.user,
});

class MyAlerts extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>

          <Card>
            <CardHeader title="Dan's Morning Commute" />
            <CardContent>
              <div>Prospect Park</div>
              <div>East</div>
              <div>5 min before</div>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small">Delete</Button>
              <Button variant="contained" size="small">Edit</Button>
              <Button variant="contained" size="small">Activate</Button>
            </CardActions>
          </Card>

          <Card>
            <CardHeader title="Dan's Afternoon Commute" />
            <CardContent>
              <div>Prospect Park</div>
              <div>West</div>
              <div>10 min before</div>
            </CardContent>
            <CardActions>
              <Button variant="contained" size="small">Delete</Button>
              <Button variant="contained" size="small">Edit</Button>
              <Button variant="contained" size="small">Activate</Button>
            </CardActions>
          </Card>

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

