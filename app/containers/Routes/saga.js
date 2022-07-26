/* import {
  take,
  call,
  put,
  select,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import axios from '../axios/axios-user';

import { GET_USER_DATA, LOGOUT } from './constants';
import { GetUserDataError1, GetUserDataSuccess1 } from './actions';

function* authUser() {
  let data;
  let e = null;

  yield axios
    .get('api/userdata', {
      headers: JSON.parse(localStorage.getItem('userData')),
    })
    .then(response => {
      console.log(response.data, 'login');
      data = response;
      e = true;
    })
    .catch(error => {
      console.log(error.response, 'elog in');
      data = error;
      e = false;
    });
  if (e) yield put(GetUserDataSuccess1(data.data.data));
  else yield put(GetUserDataError1(data));

  //
  // yield put({ type: GET_USER_DATA_ERROR, Error: 'not data' });
}
function* logout() {
  const data = JSON.parse(localStorage.getItem('userData')).Authorization;
  localStorage.removeItem('userData');
  console.log(data, 'logout');
  yield axios
    .post('api/logout')
    .then(response => {
     // console.log(response, 'logout');
    })
    .catch(error => {
     // console.log(error, 'elogout');
    });
}
 */
// Individual exports for testing
export default function* routesSaga() {
  /*  yield takeLatest(GET_USER_DATA, authUser);
  yield takeLatest(LOGOUT, logout); */
  // See example in containers/HomePage/saga.js
}
