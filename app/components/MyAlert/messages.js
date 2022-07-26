/*
 * MyAlert Messages
 *
 * This contains all the text for the MyAlert component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.MyAlert';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the MyAlert component!',
  },
});
