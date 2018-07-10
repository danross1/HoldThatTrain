import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { USER_ACTIONS } from '../../redux/actions/userActions';

class LandingPage extends Component {
    render() {
        return(
            <div>
                 <Button variant="contained" >
                     Log In/Register Here
                 </Button>
                <br/><br/>
                OR
                <br/><br/>
                <form>
                    <h3>* Quick Alert *</h3>
                    <div>
                        <label htmlFor="route" />
                        Route:
                        <select name="route">
                            <option value="901">Blue Line</option>
                            <option value="902">Green Line</option>
                            <option value="903">Red Line</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Direction" />
                        Direction:
                        <select name="direction">
                            <option value="1">South</option>
                            <option value="2">East</option>
                            <option value="3">West</option>
                            <option value="4">North</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="Stop" />
                        Stop:
                        <select name="stop">
                        </select>
                    </div>
                    <div>
                        <label htmlFor="time" />
                        Minutes to Notify (change this):
                        <input type="number"/>
                    </div>
                    <div>
                        <label htmlFor="phone" />
                        Phone Number:
                        <input type="text"/>
                    </div>
                    <input type="submit" value="Create"/>
                </form>
                 
            </div>
        )
    }
}

export default LandingPage;