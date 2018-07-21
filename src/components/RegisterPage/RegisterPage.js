import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      message: '',
      phoneNumber: ''
    };
  }

  // register the user, or, if there's an error, display the correct error message
  registerUser = (event) => {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '' 
        || this.state.confirmPassword === '' || this.state.phoneNumber === '') {
      this.setState({
        message: 'Well we can\'t help you out if you don\'t tell us your info!',
      });
    } else if(this.state.password !== this.state.confirmPassword) {
      this.setState({
        message: 'Passwords do not match, please try again!'
      });
    } else {
      const body = {
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phoneNumber
    };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/alerts');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  // change the state value for the property selected
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="confirmPassword">
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChangeFor('confirmPassword')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleInputChangeFor('phoneNumber')}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
            <Link to="/home">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

