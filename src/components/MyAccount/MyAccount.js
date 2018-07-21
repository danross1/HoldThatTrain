import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPortal } from 'react-dom';

import Nav from '../../components/Nav/Nav';
import EditUser from '../EditUser/EditUser';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

let doItOnce = false;

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      phone: '',
      id: ''
    }
    
  }

  // get user info, wait for that info to come back, and then set the local state's values
  async componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});

    await new Promise(resolve => {setTimeout(resolve, 100)})
    
    this.setValues()
  }

  // if the user logs out, send them to the home page
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  // edit the user in the persons table
  editUser = () => {
    this.props.dispatch({type: USER_ACTIONS.EDIT_USER, payload: this.state})
  }

  // take the values from the redux state and copy it to the local state
  // in order to populate the input fields for editing
  setValues = () => {
    const defaultUserName = this.props.user.user.username;
    const defaultUserPhone = this.props.user.user.phone;
    const defaultUserID = this.props.user.user.id;
    
    this.setState({
      username: defaultUserName,
      phone: defaultUserPhone,
      id: defaultUserID
    })
  }

  // change the state value for the property selected
  handleChange = property => event => {
    this.setState({
      [property]: event.target.value
    })
  }

  render() {
    let content = null;

    if (this.props.user.user) {
      content = (
        <div>
          <h1>Account Info</h1>
          <p>Username:</p>
          <input type="text" onChange={this.handleChange('username')} value={this.state.username} />
          <p>Phone Number:</p>
          <input type="text" onChange={this.handleChange('phone')} value={this.state.phone} />
          <button onClick={this.editUser}>Edit</button>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        <div>
          { content }
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyAccount);
