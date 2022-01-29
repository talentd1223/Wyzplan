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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {retirementDialogActive} from "../../../store/Atoms";
import {randomKey} from "../../../utils";
import useStyles from '../../../styles/Period.style';
import RetirementFields from "./RetirementFields";
import RetirementPeriod from "./RetirementPeriod";

function RetirementDialog({ business, setBusiness }: GoalDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useRecoilState(retirementDialogActive);
  const [retirementPeriods, setRetirementPeriods] = React.useState<Array<RetirementPeriodsTypes>>(
    [{
      periodBegins: '',
      contributions: '',
      traditionalIra: '',
      rothIra: '',
      afterTax: '',
    }]
  );

  const onAddRetirementPeriod = () => {
    setRetirementPeriods([
      ...retirementPeriods,
      {
        periodBegins: '',
        contributions: '',
        traditionalIra: '',
        rothIra: '',
        afterTax: '',
      }
    ])
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => setOpen(!open)}>
      <DialogTitle style={{ textAlign: 'center', paddingBottom: 0 }}>
        Adding Goals for {business?.name}: Retirement
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 24 }}>
        <DialogContentText style={{ textAlign: 'center', paddingBottom: 48 }}>
          Select Goals and Enter Data
        </DialogContentText>
        <Divider style={{ marginBottom: 24 }} />
        <RetirementFields />
        <div className="flex" style={{ marginTop: 64 }}>
          <div>
            <Typography variant="subtitle2" className={classes.labelField}>
              Period Begins
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Your Contributions
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Traditional IRA (Pre-Tax)
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Roth IRA (After-Tax)
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              After Tax (Taxed on Withdrawal)
            </Typography>
          </div>
          <div className="flex" style={{ marginLeft: 64 }}>
            { retirementPeriods.length && (
              <>
                { retirementPeriods.map((period, index) => (
                  <RetirementPeriod key={randomKey()} data={period} index={index} />
                ))}
              </>
            )}
            <div style={{ marginLeft: 32 }} className="flex flex--align-center">
              <MuiButton
                style={{ height: 42 }}
                onClick={onAddRetirementPeriod}
                startIcon={<AddCircleOutlineIcon fontSize="large" />}
              >
                Add Period
              </MuiButton>
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

export default RetirementDialog;
