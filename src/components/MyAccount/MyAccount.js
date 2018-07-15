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
      phone: ''
    }
    
  }

  async componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});

    await new Promise(resolve => {setTimeout(resolve, 1000)})
    
    this.setValues()
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  editUser = () => {
    console.log('in editUser');
    
  }

  setValues = () => {
    console.log(this.props);
    
    const defaultUserName = this.props.user.user.username;
    console.log({defaultUserName});
    const defaultUserPhone = this.props.user.user.phone;
    console.log({defaultUserPhone});
    
    this.setState({
      username: defaultUserName,
      phone: defaultUserPhone
    })
  }

  handleChange = property => event => {
    console.log('in handleChange w/', property);
    this.setState({
      [property]: event.target.value
    })
    console.log('this.state:', this.state);
    
  }

  render() {
    let content = null;

    if (this.props.user.user) {
      console.log(this.props.user);
      
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
          <p>this.state:</p>
          {JSON.stringify(this.state)}<br/>

          <p>this.props.user.user.username:</p>

          {JSON.stringify(this.props.user.user.username)}
        { content }
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MyAccount);
