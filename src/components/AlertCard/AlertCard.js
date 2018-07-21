import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { ALERT_ACTIONS } from '../../redux/actions/alertActions';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.user,
    alerts: state.alerts
  });

class AlertCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            active: false,
            name: '',
            route: '',
            direction: '',
            stop: '',
            when_to_alert: '',
            routeList: []
        }
    }

    // Wait a moment for the reduxState to load, then set the state's values
    async componentDidMount() {
        await new Promise(resolve => {setTimeout(resolve, 10)})
        this.setValues();
    }
    

    // set the local state's values from the alert passed from the MyAlerts component
    setValues = () => {
        const oldName = this.props.alert.alert_name;
        const oldWhenAlert = this.props.alert.when_to_alert;
        const oldRoute = this.props.alert.route;
        const oldDirection = this.props.alert.direction_id;
        const oldStop = this.props.alert.stop_id;
        const oldActive = this.props.alert.active;
        
        this.setState({
          ...this.state,
          name: oldName,
          when_to_alert: oldWhenAlert,
          route: oldRoute,
          direction: oldDirection,
          stop: oldStop,
          active: oldActive
        })
    }

    // if in edit mode, package and dispatch the alert for editing, then re-mount the card
    // if not in edit mode, change to edit mode
    toggleEditMode = () => {
        if(this.state.editMode) {
            this.setState({
                ...this.state,
                editMode: false
            })
            let alertToEdit = {
                alertName: this.state.name,
                route: this.state.route,
                direction: this.state.direction,
                stop: this.state.stop,
                when_to_alert: this.state.when_to_alert,
                alert_id: this.props.alert.id
            }
            
            this.props.editAlert(alertToEdit);

            this.componentDidMount();
        } else {
            this.setState({
                ...this.state,
                editMode: true
            })
        }
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

    // toggles the alert's active bool and disopatches that change off to the database
    activateAlert() {
        const oldActive = this.props.alert.active;
        this.props.dispatch({type: ALERT_ACTIONS.TOGGLE_ACTIVATION, payload: this.props.alert})
        this.setState({
            ...this.state,
            active: !oldActive
        })
    }

    render() {
        let content = null;
        let editButtonText = null;
        let activateButtonText = null;
        let directionList = null;

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

        // either display the information or a form to edit that information
        if(!this.state.editMode) {
            content = (
                <div>
                    <div>{this.props.alert.route_name}</div>
                    <div>{this.props.alert.station_name}</div>
                    <div>{this.props.alert.direction}</div>
                    <div>{this.props.alert.when_to_alert} min before</div>
                </div>
            )
            editButtonText = 'Edit';
        } else {
            content = (
                <div>
                    <label>
                        Alert Name:
                        <input type="text" onChange={this.handleInputChangeFor('name')} value={this.state.name} />
                    </label>
                    <label>
                        Route:
                        <select onChange={this.handleInputChangeFor('route')} name="route">
                                <option value=""></option>
                                <option value="901">Blue Line</option>
                                <option value="902">Green Line</option>
                                <option value="903">Red Line</option>
                        </select>
                    </label>
                    <label>
                    Direction:
                    {directionList}
                    </label>
                    <label>
                        Station:
                        <select onChange={this.handleInputChangeFor('stop')} name="stop">
                            <option value=""></option>
                                {this.state.routeList.map((stop, i) => {
                                    return (
                                        <option key={i} value={stop.id}>{stop.name}</option>
                                    )
                                })}
                        </select>
                    </label>
                    <label>
                        When To Alert:
                        <input type="text" onChange={this.handleInputChangeFor('when_to_alert')} value={this.state.when_to_alert} />
                    </label>
                </div>
            )
            editButtonText = 'Save';
        }

        // switch the button text based on whether the alert is currently active
        if(this.state.active) {
            activateButtonText = 'Deactivate';
        } else {
            activateButtonText = 'Activate';
        };

        return (
            <Card>
                <CardHeader title={this.props.alert.alert_name} />
                <CardContent>{ content }</CardContent>
                <CardActions>
                    <Button onClick={() => this.props.deleteAlert(this.props.alert)} variant="contained" size="small">Delete</Button>
                    <Button onClick={this.toggleEditMode} variant="contained" size="small">{editButtonText}</Button>
                    <Button onClick={() => this.activateAlert()} variant="contained" size="small">{activateButtonText}</Button>
                </CardActions>
            </Card>
        )
    }
}

export default connect(mapStateToProps)(AlertCard);