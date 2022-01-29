/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {useRecoilState} from "recoil";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MuiButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import {sellSharesDialogActive} from "../../../store/Atoms";
import useStyles from '../../../styles/Period.style';

function SellSharesDialog({ business, setBusiness }: GoalDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useRecoilState(sellSharesDialogActive);

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => setOpen(!open)}>
      <DialogTitle style={{ textAlign: 'center', paddingBottom: 0 }}>
        Adding Goals for {business?.name}: Sell Shares
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 24 }}>
        <DialogContentText style={{ textAlign: 'center', paddingBottom: 48 }}>
          Select Goals and Enter Data
        </DialogContentText>
        <Divider style={{ marginBottom: 24 }} />
        <div className="flex flex--justify-center">
          <div>
            <Typography variant="subtitle2" className={classes.labelField}>
              When Sell
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Shares Owned
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Shares Sold
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Calculated Value
            </Typography>
            <Typography style={{ marginLeft: 24 }} variant="subtitle2" className={classes.labelField}>
              Total Business
            </Typography>
            <Typography style={{ marginLeft: 24 }} variant="subtitle2" className={classes.labelField}>
              40% Share (no discount)
            </Typography>
          </div>
          <div className="flex">
            <div className={classes.periodWrapper}>
              <TextField
                className={classes.input}
                variant="outlined"
                label=""
                autoFocus
                // @ts-ignore
                onChange={(event, newValue: string) => {
                  const nextValue = newValue || '';
                  console.log(nextValue);
                }}
              />
              <TextField
                className={classes.input}
                variant="outlined"
                label=""
                autoFocus
                // @ts-ignore
                onChange={(event, newValue: string) => {
                  const nextValue = newValue || '';
                  console.log(nextValue);
                }}
              />
              <TextField
                className={classes.input}
                variant="outlined"
                label=""
                autoFocus
                // @ts-ignore
                onChange={(event, newValue: string) => {
                  const nextValue = newValue || '';
                  console.log(nextValue);
                }}
              />
              <Typography variant="subtitle2" className={classes.labelField}>
                {' '}
              </Typography>
              <Typography variant="subtitle2" className={classes.labelField}>
                X
              </Typography>
              <Typography variant="subtitle2" className={classes.labelField}>
                Y
              </Typography>
            </div>
          </div>
          <div style={{ marginLeft: 48 }}>
            <Typography variant="subtitle2" className={classes.labelField}>
              Actual Sale Price
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Expense of Sale
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Net Sale Price
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Taxes
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Cash Received - Calculated
            </Typography>
            <Typography style={{ marginLeft: 24 }} variant="subtitle2" className={classes.labelField}>
              Use this Amount
            </Typography>
          </div>
          <div className="flex">
            <div className={classes.periodWrapper}>
              <TextField
                className={classes.input}
                variant="outlined"
                label=""
                autoFocus
                // @ts-ignore
                onChange={(event, newValue: string) => {
                  const nextValue = newValue || '';
                  console.log(nextValue);
                }}
              />
              <TextField
                className={classes.input}
                variant="outlined"
                label=""
                autoFocus
                // @ts-ignore
                onChange={(event, newValue: string) => {
                  const nextValue = newValue || '';
                  console.log(nextValue);
                }}
              />
              <TextField
                className={classes.input}
                variant="outlined"
                label=""
                autoFocus
                // @ts-ignore
                onChange={(event, newValue: string) => {
                  const nextValue = newValue || '';
                  console.log(nextValue);
                }}
              />
              <TextField
                className={classes.input}
                variant="outlined"
                label=""
                autoFocus
                // @ts-ignore
                onChange={(event, newValue: string) => {
                  const nextValue = newValue || '';
                  console.log(nextValue);
                }}
              />
              <Typography variant="subtitle2" className={classes.labelField}>
                X
              </Typography>
              <TextField
                className={classes.input}
                variant="outlined"
                label=""
                autoFocus
                // @ts-ignore
                onChange={(event, newValue: string) => {
                  const nextValue = newValue || '';
                  console.log(nextValue);
                }}
              />
            </div>
          </div>
        </div>
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

export default SellSharesDialog;
