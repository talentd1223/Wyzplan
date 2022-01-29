import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function AlertDialog({ open = false, setOpen, onConfirm, title, children }: AlertProps): JSX.Element {
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    setOpen(false);
    onConfirm();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleConfirm} color="secondary" autoFocus>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
