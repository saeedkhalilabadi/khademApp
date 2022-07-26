/**
 *
 * Asynchronously loads the component for StartPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
