/**
 *
 * Asynchronously loads the component for FalowUp
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
