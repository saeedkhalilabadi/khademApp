/**
 *
 * MyAlert
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Player from './audio.js';

function MyAlert({ message, severity, open1 }) {
  //console.log(props);

  const [open, setOpen] = React.useState(true);
  const [set, setset] = React.useState(true);
  const [vertical, setvertical] = React.useState('top');
  const [horizontal, sethorizontal] = React.useState('center');

  const handleClick = () => {
    setOpen(true);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    open1(false);
  };

  return (
    <Stack spacing={2} sm={{ width: '1000px' }}>
      <Snackbar
        style={{ backgroundColor: 'red !important' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      <Player url="https://havosh.nikahitec.ir/api/api/files/sound/2-bell" />
    </Stack>
  );
}

MyAlert.propTypes = {
  onSelectClose: PropTypes.func,
};

export default memo(MyAlert);
