/**
 *
 * Notification
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotification from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Notification() {
  useInjectReducer({ key: 'notification', reducer });
  useInjectSaga({ key: 'notification', saga });

  return (
    <div>
      <Helmet>
        <title>Notification</title>
        <meta name="description" content="Description of Notification" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Notification.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Notification);
