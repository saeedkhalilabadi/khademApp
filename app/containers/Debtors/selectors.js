import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the debtors state domain
 */

const selectDebtorsDomain = state => state.debtors || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Debtors
 */

const makeSelectDebtors = () =>
  createSelector(
    selectDebtorsDomain,
    substate => substate,
  );

export default makeSelectDebtors;
export { selectDebtorsDomain };
