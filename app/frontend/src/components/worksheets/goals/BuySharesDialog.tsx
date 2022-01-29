/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {useRecoilState} from "recoil";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MuiButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import {buySharesDialogActive} from "../../../store/Atoms";

function BuySharesDialog({ business, setBusiness }: GoalDialogProps): JSX.Element {
  const [open, setOpen] = useRecoilState(buySharesDialogActive);

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => setOpen(!open)}>
      <DialogTitle style={{ textAlign: 'center', paddingBottom: 0 }}>
        Adding Goals for {business?.name}: Buy Shares
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 24 }}>
        <DialogContentText style={{ textAlign: 'center', paddingBottom: 48 }}>
          Select Goals and Enter Data
        </DialogContentText>
        <Divider style={{ marginBottom: 24 }} />
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={() => setOpen(false)} color="primary" variant="outlined">
          Close
        </MuiButton>
        <MuiButton onClick={() => setOpen(false)} color="primary" variant="contained">
          Done
        </MuiButton>
      </DialogActions>
    </Dialog>
  )
}

export default BuySharesDialog;
