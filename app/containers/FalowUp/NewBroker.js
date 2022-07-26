import React from 'react';
import { Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    direction: 'rtl',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function NewBroker({ open, selectBroker, onClose }) {
  const classes = useStyles();

  const [name, setname] = React.useState('');
  const [phone, setphone] = React.useState('');

  const handleClose = () => {
    onClose();
  };

  const handleSelect = () => {
    selectBroker({ name: name, phone: phone });
    onClose();
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle style={{ direction: 'rtl' }}>کارگزار جدید</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Text className="text-muted">نام </Form.Text>
                <Form.Control
                  autoComplete="off"
                  className="fildeItemInput"
                  size="sm"
                  value={name}
                  type="text"
                  onChange={e => setname(e.target.value)}
                />
              </Form.Group>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Text className="text-muted">تلفن </Form.Text>
                <Form.Control
                  autoComplete="off"
                  className="fildeItemInput"
                  size="sm"
                  type="number"
                  value={phone}
                  onChange={e => setphone(e.target.value)}
                />
              </Form.Group>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            برگشت
          </Button>
          <Button onClick={handleSelect} color="primary">
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
