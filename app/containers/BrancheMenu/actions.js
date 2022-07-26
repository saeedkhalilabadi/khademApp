/*
 *
 * BrancheMenu actions
 *
 */

import {
  SET_VALUE,
  GET_DASHBOARD,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
} from './constants';

export function setValue(data) {
  return {
    type: SET_VALUE,
    data,
  };
}
export function getDashboard() {
  return {
    type: GET_DASHBOARD,
  };
}

export function getDashboardSuccess(data) {
  return {
    type: GET_DASHBOARD_SUCCESS,
    data,
  };
}

export function getDashboardFail(err) {
  return {
    type: GET_DASHBOARD_FAIL,
    err,
  };
}
