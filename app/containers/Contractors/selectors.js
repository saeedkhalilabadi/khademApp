import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the contractors state domain
 */

const selectContractorsDomain = state => state.contractors || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Contractors
 */

const makeSelectContractors = () =>
  createSelector(
    selectContractorsDomain,
    substate => substate,
  );

export default makeSelectContractors;
export { selectContractorsDomain };
