import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import { USER_ACTIONS } from '../../redux/actions/userActions';
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
    handleLoginButton = event => {
        this.props.history.push('/login');
    }

    handleRegisterButton = event => {
        this.props.history.push('/register');
    }

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
                    console.log({err});
                })
        }
    }

    createAlert = event => {
        event.preventDefault();
        const dataToSend = this.packPayload();
        this.props.dispatch({type: ALERT_ACTIONS.CREATE_ALERT, payload: dataToSend})
    }

    packPayload = () => {
        let dataToSend = {
            name: 'quick alert',
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

        if(this.state.routeList.length === 0) {
            routeList = (
                    <select name="stop">
                        <option value=""></option>
                    </select>
            )
        } else {
            routeList = (
                    <select onChange={this.handleInputChangeFor('stop')} name="stop">
                        <option value=""></option>
                        {this.state.routeList.map((stop, i) => {
                            return (
                                <option key={i} value={stop.id}>{stop.name}</option>
                            )
                        })}
                    </select>
            )
        }

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
        return(
            <div>
                {/* {JSON.stringify(this.state)} */}
                 <Button variant="contained" onClick={() => this.handleLoginButton('/login')}>
                     Log In
                 </Button>
                 <Button variant="contained" onClick={() => this.handleRegisterButton('/register')}>
                     Register
                 </Button>
                <br/><br/>
                OR
                <br/><br/>
                <form onSubmit={this.createAlert}>
                    <h3>* Quick Alert *</h3>
                    <div>
                        <label htmlFor="route">
                        Route:
                        <select name="route" onChange={this.handleInputChangeFor('route')}>
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
                        Minutes to Notify (change this):
                        <input onChange={this.handleInputChangeFor('when_to_alert')} type="number"/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="phone">
                        Phone Number:
                        <input onChange={this.handleInputChangeFor('phone')} type="text"/>
                        </label>
                    </div>
                    <input type="submit" value="Create"/>
                </form>
                 
            </div>
        )
    }
}

export default connect(mapStateToProps)(LandingPage);