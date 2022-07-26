/*
 *
 * Routes actions
 *
 */

import {
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  LOGOUT,
} from './constants';

export function GetUserData() {
  return {
    type: GET_USER_DATA,
  };
}
export function GetUserDataSuccess1(data) {
  return {
    type: GET_USER_DATA_SUCCESS,
    data,
  };
}
export function GetUserDataError1(error) {
  return {
    type: GET_USER_DATA_ERROR,
    error,
  };
}
export function logOut() {
  return {
    type: LOGOUT,
  };
}
