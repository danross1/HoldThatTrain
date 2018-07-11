import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

class CreateAlert extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            route: '',
            direction: '',
            stop: '',
            when_to_alert: ''
        };
    };

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
          [propertyName]: event.target.value,
        });
      }

    render() {
        return (
            <div>
                <Nav />
                <form>
                <h1>Create Alert</h1>
                <div>
                    <label htmlFor="name">
                    Alert Name:
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInputChangeFor('username')}
                    />
                    </label>
                </div>
                <div>
                    <label htmlFor="route">
                    Route:
                    <select name="route">
                            <option value="901">Blue Line</option>
                            <option value="902">Green Line</option>
                            <option value="903">Red Line</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label htmlFor="Direction" >
                    Direction:
                    <select name="direction">
                        <option value="1">South</option>
                        <option value="2">East</option>
                        <option value="3">West</option>
                        <option value="4">North</option>
                    </select>
                    </label>
                </div>
                <div>
                    <label htmlFor="Stop">
                    Stop:
                    <select name="stop">
                    </select>
                    </label>
                </div>
                <div>
                    <label htmlFor="time">
                    Minutes to Notify (change this):
                    <input type="number"/>
                    </label>
                </div>
                <Button variant="contained">Create</Button>
                </form>
            </div>
        )
    }
}

export default CreateAlert;