import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashbord state domain
 */

const selectDashbordDomain = state => state.dashbord || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashbord
 */

const makeSelectDashbord = () =>
  createSelector(
    selectDashbordDomain,
    substate => substate,
  );

export default makeSelectDashbord;
export { selectDashbordDomain };
