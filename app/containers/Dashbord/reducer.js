/*
 *
 * Dashbord reducer
 *
 */
import produce from 'immer';
import moment from 'moment-jalaali';
import fa from 'moment/src/locale/fa';
import {
  GET_DATA,
  GET_DATA_ERROR,
  GET_DATA_SUCCESS,
  SET_CLOSE_ALARM,
} from './constants';

export const initialState = {
  data: [],
  follow_up: [],
  unpaid: [],
  falows: [],
  closeAlarm1: false,
  closeAlarm2: false,
  closeAlarm3: false,
};

/* eslint-disable default-case, no-param-reassign */
const dashbordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CLOSE_ALARM:
        action.data == 1 ? (draft.closeAlarm1 = true) : null;
        action.data == 2 ? (draft.closeAlarm2 = true) : null;
        action.data == 3 ? (draft.closeAlarm3 = true) : null;

        break;
      case GET_DATA:
        JSON.parse(localStorage.getItem('FalowerUp'))
          ? (draft.falows = JSON.parse(
              localStorage.getItem('FalowerUp'),
            ).filter(item => item.contractStatus == 'نشده'))
          : null;
        JSON.parse(localStorage.getItem('Debtors'))
          ? (draft.unpaid = JSON.parse(localStorage.getItem('Debtors')).filter(
              item => item.contractStatus == 'نشده',
            ))
          : null;

        if (JSON.parse(localStorage.getItem('Contractors')))
          draft.follow_up = JSON.parse(
            localStorage.getItem('Contractors'),
          ).filter(
            item =>
              item.statusOfReceivables != 'موجود' &&
              item.follow_up != 'شده' &&
              item.date != null &&
              item.date.year <=
                moment()
                  .add(-item.follow_up, 'day')
                  .jYear() &&
              item.date.month <=
                moment()
                  .add(-item.follow_up, 'day')
                  .jMonth() +
                  1 &&
              item.date.day <=
                moment()
                  .add(-item.follow_up, 'day')
                  .jDate(),
          );

        break;
      case GET_DATA_SUCCESS:
        break;
      case GET_DATA_ERROR:
        break;
    }
  });

export default dashbordReducer;
