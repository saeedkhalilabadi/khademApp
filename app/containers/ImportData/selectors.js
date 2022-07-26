import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the importData state domain
 */

const selectImportDataDomain = state => state.importData || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ImportData
 */

const makeSelectImportData = () =>
  createSelector(
    selectImportDataDomain,
    substate => substate,
  );

export default makeSelectImportData;
export { selectImportDataDomain };
