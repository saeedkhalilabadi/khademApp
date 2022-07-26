/*
 *
 * BrancheMenu reducer
 *
 */
import produce from 'immer';
import {
  SET_VALUE,
  GET_DASHBOARD,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
} from './constants';

export const initialState = {
  dashboardData: [],
  device: 'mob',
};

/* eslint-disable default-case, no-param-reassign */
const brancheMenuReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_VALUE:
        draft.device = action.data;
        break;
      case GET_DASHBOARD:
        break;
      case GET_DASHBOARD_SUCCESS:
        draft.dashboardData = action.data;
        break;
      case GET_DASHBOARD_FAIL:
        break;
    }
  });

export default brancheMenuReducer;
