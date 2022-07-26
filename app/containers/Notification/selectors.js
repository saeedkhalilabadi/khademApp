import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notification state domain
 */

const selectNotificationDomain = state => state.notification || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Notification
 */

const makeSelectNotification = () =>
  createSelector(
    selectNotificationDomain,
    substate => substate,
  );

export default makeSelectNotification;
export { selectNotificationDomain };
