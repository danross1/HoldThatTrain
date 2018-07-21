import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { ALERT_ACTIONS } from '../../redux/actions/alertActions';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
  });

class CreateAlert extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            route: '',
            direction: '',
            stop: '',
            when_to_alert: '',
            routeList: []
        };
    };

    // on mount, get user information
    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        
      }

    // change the state value for the property selected
    // if the route property is changed, send an axios request to populate the list of stations
    handleInputChangeFor = propertyName => event => {
        this.setState({
          [propertyName]: event.target.value,
        });
        if(propertyName === 'route') {
            console.log('in route change');
            axios.get(`/api/alert/route/${event.target.value}`)
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        ...this.state,
                        routeList: response.data
                    });
                }).catch(err => {
                    alert('Uh oh! This train\'s gone off the tracks!')
                })
        }
    }

    // dispatch the new alert to the database if all fields are filled out
    createAlert = event => {
        event.preventDefault();
        const dataToSend = this.packPayload();
        if(this.state.route && this.state.direction && this.state.stop && this.state.when_to_alert){
            this.props.dispatch({type: ALERT_ACTIONS.CREATE_ALERT, payload: dataToSend})
            this.props.history.push('/alerts');
        } else {
            alert('Please fill out all fields!');
        }
    }

    // package the new alert into an object
    packPayload = () => {
        const userID = this.props.user.user.id
        console.log({userID});

        let dataToSend = {
            name: this.state.name,
            route: this.state.route,
            direction: this.state.direction,
            stop: this.state.stop,
            when_to_alert: this.state.when_to_alert,
            user_id: userID
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
                <label htmlFor="Stop">
                    Stop:
                    <select name="stop">
                    </select>
                </label>
            )
        } else {
            routeList = (
                <label htmlFor="Stop">
                    Stop:
                    <select onChange={this.handleInputChangeFor('stop')} name="stop">
                    <option value=""></option>
                        {this.state.routeList.map((stop, i) => {
                            console.log({stop})
                            return (
                                <option key={i} value={stop.id}>{stop.name}</option>
                            )
                        })}
                    </select>
                </label>
            )
        }

        // only populate the direction list with the directions available for the given route
        if(this.state.route === '902') {
            directionList = (
                <select onChange={this.handleInputChangeFor('direction')} name="direction">
                    <option value=""></option>
                    <option value="2">East</option>
                    <option value="3">West</option>
                </select>
            )
        } else {
            directionList = (
                <select onChange={this.handleInputChangeFor('direction')} name="direction">
                    <option value=""></option>
                    <option value="1">South</option>
                    <option value="4">North</option> 
                </select>
            )
        }

        return (
            <div>
                <Nav />
                {/* { JSON.stringify(this.state) } */}
                { JSON.stringify(this.props.user) }
                <form>
                <h1>Create Alert</h1>
                <div>
                    <label htmlFor="name">
                    Alert Name:
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChangeFor('name')}
                    />
                    </label>
                </div>
                <div>
                    <label htmlFor="route">
                    Route:
                    <select onChange={this.handleInputChangeFor('route')} name="route">
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
                    { routeList }
                </div>
                <div>
                    <label htmlFor="time">
                    Minutes to Notify (change this):
                    <input onChange={this.handleInputChangeFor('when_to_alert')} type="number"/>
                    </label>
                </div>
                <Button onClick={this.createAlert} variant="contained">Create</Button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CreateAlert);