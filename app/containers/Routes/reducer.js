/*
 *
 * Routes reducer
 *
 */
import produce from 'immer';
import {
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA,
  GET_USER_DATA_ERROR,
  LOGOUT,
} from './constants';

export const initialState = {
  unit: 'ریال',
  userLogin: -1,
  userData: -1,
  userError: -1,
};

/* eslint-disable default-case, no-param-reassign */
const routesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USER_DATA_SUCCESS:
        // console.log(action.data.data, 'data');
        draft.userLogin = action.data.role_id;
        draft.userData = action.data;

        break;
      case GET_USER_DATA:
        draft.userLogin = null;
        draft.userData = null;
        draft.userError = null;

        break;

      case GET_USER_DATA_ERROR:
        draft.userLogin = -2;
        break;
      case LOGOUT:
        draft.userLogin = -2;
        break;
    }
  });

export default routesReducer;
