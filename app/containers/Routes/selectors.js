import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the routes state domain
 */

const selectRoutesDomain = state => state.routes || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Routes
 */

const makeSelectRoutes = () =>
  createSelector(
    selectRoutesDomain,
    substate => substate,
  );

export default makeSelectRoutes;
export { selectRoutesDomain };
