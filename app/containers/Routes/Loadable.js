/**
 *
 * Asynchronously loads the component for Routes
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
