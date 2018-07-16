import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { ALERT_ACTIONS } from '../../redux/actions/alertActions';

const mapStateToProps = state => ({
    user: state.user,
  });

class CreateAlert extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            route: 901,
            direction: 1,
            stop: 56334,
            when_to_alert: '',
        };
    };

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        
      }

    handleInputChangeFor = propertyName => event => {
        this.setState({
          [propertyName]: event.target.value,
        });
    }

    createAlert = () => {
        const dataToSend = this.packPayload();
        this.props.dispatch({type: ALERT_ACTIONS.CREATE_ALERT, payload: dataToSend})
        
    }

    packPayload = () => {
        let dataToSend = {
            ...this.state,
            user_id: this.props.user.user.id
        }
        return dataToSend;
    }

    render() {
        return (
            <div>
                <Nav />
                {JSON.stringify(this.state)}
                {JSON.stringify(this.props.user)}
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
                            <option value="901">Blue Line</option>
                            <option value="902">Green Line</option>
                            <option value="903">Red Line</option>
                    </select>
                    </label>
                </div>
                <div>
                    <label htmlFor="Direction" >
                    Direction:
                    <select onChange={this.handleInputChangeFor('direction')} name="direction">
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