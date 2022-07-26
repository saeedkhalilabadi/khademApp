/*
 * Notif Messages
 *
 * This contains all the text for the Notif component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Notif';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Notif component!',
  },
});
