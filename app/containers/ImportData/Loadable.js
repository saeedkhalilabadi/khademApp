/**
 *
 * Asynchronously loads the component for ImportData
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
