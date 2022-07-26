/**
 *
 * Loading
 *
 */

import React, { memo } from 'react';
import TrinityRingsSpinner from './loadingsp';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './index.css';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Loading() {
  return (
    <div className="loadingpage">
      <div className="loading">
        <TrinityRingsSpinner  size={200} />
      </div>
    </div>
  );
}

Loading.propTypes = {};

export default memo(Loading);
