import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the falowUp state domain
 */

const selectFalowUpDomain = state => state.falowUp || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FalowUp
 */

const makeSelectFalowUp = () =>
  createSelector(
    selectFalowUpDomain,
    substate => substate,
  );

export default makeSelectFalowUp;
export { selectFalowUpDomain };
