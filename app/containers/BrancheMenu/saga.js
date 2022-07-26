/* import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from '../axios/base';
import {
  GET_DASHBOARD
} from './constants';
import {
  getDashboardSuccess,
  getDashboardFail,
} from './actions';
export function* getDashboard() {
    let e = 0;
    let data = 0;
    
        yield axios
            .get('/api/dashboard',{
      headers: JSON.parse(localStorage.getItem('userData')),
    })
            .then(response => {
               console.log(response, 'response');
                data = response.data.data;
                // console.log(response.data.data.userData, 'res');
                e = 1;
            })
            .catch(error => {
                data = error;
                console.log(error.response);
            });
        if (e == 1) yield put(getDashboardSuccess(data));
        else yield put(getDashboardFail(data)); 
    } */
export default function* brancheMenuSaga() {
  /*  yield takeLatest(GET_DASHBOARD, getDashboard); */
}
