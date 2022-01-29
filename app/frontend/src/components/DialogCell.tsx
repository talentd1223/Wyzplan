import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useRecoilState} from "recoil";
import {dialogCellActive} from "../store/Atoms";
import useStyles from '../styles/Dialog.style';

function DialogCell():JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useRecoilState(dialogCellActive);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.dialog}
    >
      <DialogTitle id="form-dialog-title">Placeholder Dialog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is a Placeholder Dialog Modal
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogCell;
