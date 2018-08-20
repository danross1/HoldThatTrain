import { combineReducers } from 'redux';
import { ALERT_ACTIONS } from '../actions/alertActions';

const alerts = (state = [], action) => {
    switch (action.type) {
        case ALERT_ACTIONS.SET_ALERTS:
            state = action.alerts;
            break;
        default:
            break;
    }
    return state;
}

const isLoading = (state = false, action) => {
    switch (action.type) {
      case ALERT_ACTIONS.REQUEST_START:
        return true;
      case ALERT_ACTIONS.REQUEST_DONE:
        return false;
      default:
        return state;
    }
  };

export default combineReducers({
    alerts,
    isLoading
});