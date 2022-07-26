/* import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from '../axios/axios-user';
import { getDataSuccess, getDataError } from './actions';
import { GET_DATA } from './constants';

export function* getdata(params) {
  let data;
  let e = null;

  yield axios
    .post('api/activites/getdata', params.data, {
      headers: JSON.parse(localStorage.getItem('userData')),
    })
    .then(response => {
      console.log(response.data, 'employees1');
      data = response.data;
      e = true;
    })
    .catch(error => {
      console.log(error.response);
      data = error.response;
      e = false;
    });
  if (e) yield put(getDataSuccess(data));
  else yield put(getDataError(data));
} */
// Individual exports for testing
export default function* dashbordSaga() {
  // See example in containers/HomePage/saga.js
}
