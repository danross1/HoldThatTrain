import { put, takeLatest, actionChannel } from 'redux-saga/effects';
import { ALERT_ACTIONS } from '../actions/alertActions';
import { USER_ACTIONS } from '../actions/userActions';
import { callAlerts, addAlert, removeAlert, updateAlert, toggleActive } from '../requests/alertRequests';

// get alerts
// fired on FETCH.ALERTS
function* fetchAlerts(action) {
    console.log({action});
    try {
      // start the request
      yield put({ type: ALERT_ACTIONS.REQUEST_START });
      // get the alerts using callAlerts()
      const alerts = yield callAlerts(action.user);
      // set the redux state alerts
      yield put({
        type: ALERT_ACTIONS.SET_ALERTS,
        alerts,
      });
      // finish request
      yield put({
        type: ALERT_ACTIONS.REQUEST_DONE,
      });
    } catch (error) {
      yield put({
        type: ALERT_ACTIONS.REQUEST_DONE,
      });
      yield put({
        type: ALERT_ACTIONS.ALERT_ACTION_FAILED,
        message: error.data || "FORBIDDEN",
      });
    }
  }

  // create an alert
  // fired on CREATE_ALERT
function* createAlert(action) {
  console.log({action});
  try{
    // start request
    yield put({ type: ALERT_ACTIONS.REQUEST_START });
    // add the alert to the database using addAlert()
    yield addAlert(action.payload)
    // finish request
    yield put({
      type: ALERT_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: ALERT_ACTIONS.REQUEST_DONE,
    });
    yield put({
      type: ALERT_ACTIONS.ALERT_ACTION_FAILED,
      message: error.data || "FORBIDDEN",
    });
  }
}

// delete an alert
// fires on DELETE_ALERT
function* deleteAlert(action) {
  console.log({action});
  try{
    // start request
    yield put({ type: ALERT_ACTIONS.REQUEST_START });
    // delete alert from database using removeAlert()
    yield removeAlert(action.payload)
    // finish request
    yield put({
      type: ALERT_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: ALERT_ACTIONS.REQUEST_DONE,
    });
    yield put({
      type: ALERT_ACTIONS.ALERT_ACTION_FAILED,
      message: error.data || "FORBIDDEN",
    });
  }
}

// edits an alert
// fires on EDIT_ALERT
function* editAlert(action) {
  console.log({action});
  try{
    // start request
    yield put({ type: ALERT_ACTIONS.REQUEST_START });
    // edit alert in database using updateAlert()
    yield updateAlert(action.payload)
    // finish request
    yield put({
      type: ALERT_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: ALERT_ACTIONS.REQUEST_DONE,
    });
    yield put({
      type: ALERT_ACTIONS.ALERT_ACTION_FAILED,
      message: error.data || "FORBIDDEN",
    });
  }
}

// toggles active
//  fires on TOGGLE_ACTIVATION
function* toggleActivation(action){
  try{
    // start requesr
    yield put({ type: ALERT_ACTIONS.REQUEST_START });
    // edit active bool using toggleActive()
    yield toggleActive(action.payload)
    // finish request
    yield put({
      type: ALERT_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: ALERT_ACTIONS.REQUEST_DONE,
    });
    yield put({
      type: ALERT_ACTIONS.ALERT_ACTION_FAILED,
      message: error.data || "FORBIDDEN",
    });
  }
}

function* alertSaga() {
    yield takeLatest(ALERT_ACTIONS.FETCH_ALERTS, fetchAlerts);
    yield takeLatest(ALERT_ACTIONS.CREATE_ALERT, createAlert);
    yield takeLatest(ALERT_ACTIONS.DELETE_ALERT, deleteAlert);
    yield takeLatest(ALERT_ACTIONS.EDIT_ALERT, editAlert);
    yield takeLatest(ALERT_ACTIONS.TOGGLE_ACTIVATION, toggleActivation)
  };

export default alertSaga;