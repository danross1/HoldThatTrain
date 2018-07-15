import { put, takeLatest, actionChannel } from 'redux-saga/effects';
import { ALERT_ACTIONS } from '../actions/alertActions';
import { USER_ACTIONS } from '../actions/userActions';
import { callAlerts, addAlert, removeAlert } from '../requests/alertRequests';

function* fetchAlerts(action) {
    console.log({action});
    
    try {
      yield put({ type: ALERT_ACTIONS.REQUEST_START });
      const alerts = yield callAlerts(action.user);
      yield put({
        type: ALERT_ACTIONS.SET_ALERTS,
        alerts,
      });
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

function* createAlert(action) {
  console.log({action});
  
  try{
    yield put({ type: ALERT_ACTIONS.REQUEST_START });
    yield addAlert(action.payload)
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

function* deleteAlert(action) {
  console.log({action});
  
  try{
    yield put({ type: ALERT_ACTIONS.REQUEST_START });
    yield removeAlert(action.payload)
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
    yield takeLatest(ALERT_ACTIONS.DELETE_ALERT, deleteAlert)
  };

export default alertSaga;