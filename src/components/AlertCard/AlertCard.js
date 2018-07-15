import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

// const AlertCard = props => {
//     return(
//         <div>{alert}</div>
//     )
// }

class AlertCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            name: '',
            route: 901,
            direction: 1,
            stop: 56334,
            when_to_alert: '',
        }
    }

    componentDidMount() {
        this.setValues();
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
        
        this.setState({
          ...this.state,
          name: oldName,
          when_to_alert: oldWhenAlert
        })
    }

    toggleEditMode = () => {
        if(this.state.editMode) {
            console.log('in edit mode');
            this.setState({
                ...this.state,
                editMode: false
            })
        } else {
            console.log('not in edit mode');
            this.setState({
                ...this.state,
                editMode: true
            })
        }
    }

    render() {
        let content = null;

        if(!this.state.editMode) {
            content = (
                <div>
                    <div>{this.props.alert.stop}</div>
                    <div>{this.props.alert.direction}</div>
                    <div>{this.props.alert.when_to_alert} min before</div>
                </div>
            )
        } else {
            content = (
                <div>
                    <input type="text" value={this.state.name}/>
                    <input type="text" value={this.state.direction}/>
                    <input type="text" value={this.state.when_to_alert}/>
                </div>
            )
        }
        return (
            <Card>
                <CardHeader title={this.props.alert.name} />
                <CardContent>
                    {content}
                </CardContent>
                <CardActions>
                    <Button onClick={() => this.deleteAlert(this.props.alert)} variant="contained" size="small">Delete</Button>
                    <Button onClick={this.toggleEditMode} variant="contained" size="small">Edit</Button>
                    <Button variant="contained" size="small">Activate</Button>
                </CardActions>
            </Card>
        )
    }
}

export default AlertCard;