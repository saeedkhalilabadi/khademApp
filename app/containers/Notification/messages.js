/*
 * Notification Messages
 *
 * This contains all the text for the Notification container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Notification';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Notification container!',
  },
});
