import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import alertSaga from './alertSaga'


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    alertSaga()
    // watchIncrementAsync()
  ]);
}
