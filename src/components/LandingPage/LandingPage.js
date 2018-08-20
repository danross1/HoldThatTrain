import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import { ALERT_ACTIONS } from '../../redux/actions/alertActions';

const mapStateToProps = state => ({
    user: state.user,
  });

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '',
            direction: '',
            stop: '',
            when_to_alert: '',
            phone: '',
            routeList: []
        }
    }
    // go to the login page if the login button is clicked
    handleLoginButton = event => {
        this.props.history.push('/login');
    }

    // go to register page if the register button is clicked
    handleRegisterButton = event => {
        this.props.history.push('/register');
    }

    // change the state value for the property selected
    // if the route property is changed, send an axios request to populate the list of stations
    handleInputChangeFor = propertyName => event => {
        this.setState({
          [propertyName]: event.target.value,
        });
        if(propertyName === 'route') {
            axios.get(`/api/alert/route/${event.target.value}`)
                .then(response => {
                    this.setState({
                        ...this.state,
                        routeList: response.data
                    });
                }).catch(err => {
                    alert('Uh oh! This train\'s gone off the tracks!')
                })
        }
    }

    // dispatch the quick alert to the database if all fields are filled out
    createAlert = event => {
        event.preventDefault();
        const dataToSend = this.packPayload();
        if(this.state.route && this.state.direction && this.state.stop && this.state.when_to_alert && this.state.phone){
            this.props.dispatch({type: ALERT_ACTIONS.CREATE_ALERT, payload: dataToSend})
            this.clearInputs();
        } else {
            alert('Please fill out all fields!');
        }
    }

    // clear the inputs after creation of new quick alert
    clearInputs() {
        this.setState({
            route: '',
            direction: '',
            stop: '',
            when_to_alert: '',
            phone: '',
            routeList: []
        })
    }

    // package the quick alert into an object
    packPayload = () => {
        let dataToSend = {
            name: 'quick alert',
            route: this.state.route,
            direction: this.state.direction,
            stop: this.state.stop,
            when_to_alert: this.state.when_to_alert,
            phone: this.state.phone
        }        
        return dataToSend;
    }

    render() {
        let routeList = null;
        let directionList = null;

        // if there is no stops in the route's list, display no stops
        // else, populate the select with the stop names
        if(this.state.routeList.length === 0) {
            routeList = (
                    <select name="stop">
                        <option value=""></option>
                    </select>
            )
        } else {
            routeList = (
                    <select onChange={this.handleInputChangeFor('stop')} name="stop" value={this.state.stop}>
                        <option value=""></option>
                        {this.state.routeList.map((stop, i) => {
                            return (
                                <option key={i} value={stop.id}>{stop.name}</option>
                            )
                        })}
                    </select>
            )
        }

        // only populate the direction list with the directions available for the given route
        if(this.state.route === '902') {
            directionList = (
                <select onChange={this.handleInputChangeFor('direction')} name="direction" value={this.state.direction}>
                    <option value=""></option>
                    <option value="2">East</option>
                    <option value="3">West</option>
                </select>
            )
        } else {
            directionList = (
                <select onChange={this.handleInputChangeFor('direction')} name="direction" value={this.state.direction}>
                    <option value=""></option>
                    <option value="1">South</option>
                    <option value="4">North</option> 
                </select>
            )
        }
        return(
            <div className="content">
                 <Button className="button" variant="contained" onClick={() => this.handleLoginButton('/login')}>
                     Log In
                 </Button>
                 <Button className="button" variant="contained" onClick={() => this.handleRegisterButton('/register')}>
                     Register
                 </Button>
                <br/><br/>
                
                <br/><br/>
                <form onSubmit={this.createAlert}>
                    <h3>* Quick Alert *</h3>
                    <div>
                        <label htmlFor="route">
                        Route:
                        <select name="route" onChange={this.handleInputChangeFor('route')} value={this.state.route}>
                            <option value=""></option>
                            <option value="901">Blue Line</option>
                            <option value="902">Green Line</option>
                            <option value="903">Red Line</option>
                        </select>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="Direction" >
                        Direction:
                        { directionList }
                        </label>
                    </div>
                    <div>
                        <label htmlFor="Stop">
                        Stop:
                        { routeList }
                        </label>
                    </div>
                    <div>
                        <label htmlFor="time">
                        When To Alert (in minutes):
                        <input onChange={this.handleInputChangeFor('when_to_alert')} type="number" value={this.state.when_to_alert}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="phone">
                        Phone Number:
                        <input onChange={this.handleInputChangeFor('phone')} type="text" value={this.state.phone}/>
                        </label>
                    </div>
                    <input type="submit" value="Create"/>
                </form>
                 
            </div>
        )
    }
}

export default connect(mapStateToProps)(LandingPage);