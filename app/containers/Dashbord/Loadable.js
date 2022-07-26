/**
 *
 * Asynchronously loads the component for Dashbord
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
