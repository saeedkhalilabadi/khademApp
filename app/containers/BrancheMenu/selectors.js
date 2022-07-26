import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the brancheMenu state domain
 */

const selectBrancheMenuDomain = state => state.brancheMenu || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BrancheMenu
 */

const makeSelectBrancheMenu = () =>
  createSelector(
    selectBrancheMenuDomain,
    substate => substate,
  );

export default makeSelectBrancheMenu;
export { selectBrancheMenuDomain };
