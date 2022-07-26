/**
 *
 * Notif
 *
 */

import React, { memo, useState } from 'react';

import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
const data = [{ message: 'این پیام تستی است!', variant: 'error' }];

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setshow] = useState(true);

  const handleClickVariant = ({ message, variant }) => () => {
    // variant could be success, error, warning, info, or default
    setshow(false);
    enqueueSnackbar(message, { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant(data[0])}>Show snackbar</Button>
      {show ? handleClickVariant(data[0]) : null}
    </React.Fragment>
  );
}

export function Notif() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}

Notif.propTypes = {};

export default memo(Notif);
