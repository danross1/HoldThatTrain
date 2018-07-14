import { put, takeLatest, actionChannel } from 'redux-saga/effects';
import { ALERT_ACTIONS } from '../actions/alertActions';
import { USER_ACTIONS } from '../actions/userActions';
import { callAlerts } from '../requests/alertRequests';

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
    }
  }


function* alertSaga() {
    yield takeLatest(ALERT_ACTIONS.FETCH_ALERTS, fetchAlerts);
  };

export default alertSaga;