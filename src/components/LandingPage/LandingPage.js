import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';

import { USER_ACTIONS } from '../../redux/actions/userActions';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            route: 901,
            direction: 1,
            stop: 56334,
            when_to_alert: '',
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

    render() {
        let routeList = null;
        let directionList = null;

        if(this.state.routeList.length === 0) {
            routeList = (
                    <select name="stop">
                    </select>
            )
        } else {
            routeList = (
                    <select onChange={this.handleInputChangeFor('stop')} name="stop">
                        {this.state.routeList.map((stop, i) => {
                            return (
                                <option key={i} value={stop.identifier}>{stop.name}</option>
                            )
                        })}
                    </select>
            )
        }

        if(this.state.route === '902') {
            directionList = (
                <select onChange={this.handleInputChangeFor('direction')} name="direction">
                    <option value="2">East</option>
                    <option value="3">West</option>
                </select>
            )
        } else {
            directionList = (
                <select onChange={this.handleInputChangeFor('direction')} name="direction">
                    <option value="1">South</option>
                    <option value="4">North</option> 
                </select>
            )
        }
        return(
            <div>
                 <Button variant="contained" onClick={() => this.handleLoginButton('/login')}>
                     Log In
                 </Button>
                 <Button variant="contained" onClick={() => this.handleRegisterButton('/register')}>
                     Register
                 </Button>
                <br/><br/>
                OR
                <br/><br/>
                <form>
                    <h3>* Quick Alert *</h3>
                    <div>
                        <label htmlFor="route">
                        Route:
                        <select name="route" onChange={this.handleInputChangeFor('route')}>
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
                        <input type="number"/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="phone">
                        Phone Number:
                        <input type="text"/>
                        </label>
                    </div>
                    <input type="submit" value="Create"/>
                </form>
                 
            </div>
        )
    }
}

export default LandingPage;