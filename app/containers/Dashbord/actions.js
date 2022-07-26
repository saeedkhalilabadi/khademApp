/*
 *
 * Dashbord actions
 *
 */

import {
  GET_DATA,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  SET_CLOSE_ALARM,
} from './constants';

export function setCloseAlarm(data) {
  return {
    type: SET_CLOSE_ALARM,
    data,
  };
}

export function getData(data) {
  return {
    type: GET_DATA,
    data,
  };
}
export function getDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    data,
  };
}
export function getDataError(data) {
  return {
    type: GET_DATA_ERROR,
    data,
  };
}
