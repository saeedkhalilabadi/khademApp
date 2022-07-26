/**
 *
 * Asynchronously loads the component for Notif
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
