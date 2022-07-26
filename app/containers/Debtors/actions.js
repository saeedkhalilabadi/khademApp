/*
 *
 * Debtors actions
 *
 */

import {
  SORT_DATA,
  SET_VALUE,
  SEARCH,
  GET_DATA,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  ADD_DATA,
  ADD_DATA_ERROR,
  ADD_DATA_SUCCESS,
  PUT_DATA,
  PUT_DATA_ERROR,
  PUT_DATA_SUCCESS,
  DELETE_DATA,
  DELETE_DATA_ERROR,
  DELETE_DATA_SUCCESS,
} from './constants';

export function sortData(data) {
  return {
    type: SORT_DATA,
    data,
  };
}
export function search(data) {
  return {
    type: SEARCH,
    data,
  };
}
export function setValue(data) {
  return {
    type: SET_VALUE,
    data,
  };
}

export function getData() {
  return {
    type: GET_DATA,
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

export function addData(data) {
  return {
    type: ADD_DATA,
    data,
  };
}
export function addDataSuccess(data) {
  return {
    type: ADD_DATA_SUCCESS,
    data,
  };
}

export function addDataError(data) {
  return {
    type: ADD_DATA_ERROR,
    data,
  };
}
export function putData(data) {
  return {
    type: PUT_DATA,
    data,
  };
}
export function putDataSuccess(data) {
  return {
    type: PUT_DATA_SUCCESS,
    data,
  };
}

export function putDataError(data) {
  return {
    type: PUT_DATA_ERROR,
    data,
  };
}
export function deleteData(data) {
  return {
    type: DELETE_DATA,
    data,
  };
}
export function deleteDataSuccess(data) {
  return {
    type: DELETE_DATA_SUCCESS,
    data,
  };
}

export function deleteDataError(data) {
  return {
    type: DELETE_DATA_ERROR,
    data,
  };
}
