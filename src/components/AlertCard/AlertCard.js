import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { ALERT_ACTIONS } from '../../redux/actions/alertActions';

const mapStateToProps = state => ({
    user: state.user,
    alerts: state.alerts
  });

class AlertCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            name: '',
            route: '',
            direction: '',
            stop: '',
            when_to_alert: '',
        }
    }

    async componentDidMount() {
        await new Promise(resolve => {setTimeout(resolve, 1000)})
        this.setValues();
    }

    componentDidUpdate() {
        
    }
    
    editAlert = alert => {
        console.log('in edit alert w/', alert);
    }

    setValues = () => {
        console.log(this.props);
        
        const oldName = this.props.alert.name;
        console.log({oldName});
        const oldWhenAlert = this.props.alert.when_to_alert;
        console.log({oldWhenAlert});
        const oldRoute = this.props.alert.route;
        console.log({oldRoute});
        const oldDirection = this.props.alert.direction;
        console.log({oldDirection});
        const oldStop = this.props.alert.stop_id;
        console.log({oldStop});
        
        
        
        this.setState({
          ...this.state,
          name: oldName,
          when_to_alert: oldWhenAlert,
          route: oldRoute,
          direction: oldDirection,
          stop: oldStop
        })
    }

    toggleEditMode = () => {
        if(this.state.editMode) {
            console.log('in edit mode');
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
            console.log({alertToEdit});
            
            this.props.editAlert(alertToEdit);

            this.componentDidMount();
        } else {
            console.log('not in edit mode');
            this.setState({
                ...this.state,
                editMode: true
            })
        }
    }

    handleInputChangeFor = propertyName => event => {
        this.setState({
          [propertyName]: event.target.value,
        });
    }

    async activateAlert() {
        console.log('in activateAlert');
        console.log(this.props.alert.active);

        this.props.dispatch({type: ALERT_ACTIONS.TOGGLE_ACTIVATION, payload: this.props.alert})
        await new Promise(resolve => {setTimeout(resolve, 1000)});
        console.log('waiting a sec');
        
        this.parent.forceUpdate();
    }

    render() {
        let content = null;
        let editButtonText = null;
        let activateButtonText = null;

        if(!this.state.editMode) {
            content = (
                <div>
                    <div>{this.props.alert.route}</div>
                    <div>{this.props.alert.stop}</div>
                    <div>{this.props.alert.direction}</div>
                    <div>{this.props.alert.when_to_alert} min before</div>
                </div>
            )
            editButtonText = 'Edit';
        } else {
            content = (
                <div>
                    <input type="text" onChange={this.handleInputChangeFor('name')} value={this.state.name} />
                    <input type="text" onChange={this.handleInputChangeFor('route')} value={this.state.route} />
                    <input type="text" onChange={this.handleInputChangeFor('direction')} value={this.state.direction} />
                    <input type="text" onChange={this.handleInputChangeFor('when_to_alert')} value={this.state.when_to_alert} />
                </div>
            )
            editButtonText = 'Save';
        }

        if(this.props.alert.active) {
            activateButtonText = 'Deactivate';
        } else {
            activateButtonText = 'Activate';
        };

        return (
            <Card>
                <CardHeader title={this.props.alert.name} />
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