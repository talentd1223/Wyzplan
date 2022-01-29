import * as React from 'react';
import {useRecoilState} from "recoil";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import MuiButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {profitDialogActive} from "../../../store/Atoms";
import useStyles from '../../../styles/Period.style';
import Period from "./ProfitPeriod";
import {randomKey} from "../../../utils";

function ProfitDialog({ business, setBusiness }: GoalDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useRecoilState(profitDialogActive);
  const [periods, setPeriods] = React.useState<Array<ProfitPeriodsTypes>>([{
      periodBegins: '',
      periodEnds: '',
      totalAnnualIncrease: '',
      ownershipShare: '',
      yourAmount: '',
      annualIncrease: '',
    }]
  );

  const onAddPeriod = () => {
    setPeriods([
      ...periods,
      {
        periodBegins: '',
        periodEnds: '',
        totalAnnualIncrease: '',
        ownershipShare: '',
        yourAmount: '',
        annualIncrease: '',
      }
    ])
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => setOpen(!open)}>
      <DialogTitle style={{ textAlign: 'center', paddingBottom: 0 }}>
        Adding Goals for {business?.name}: Profit Distribution
      </DialogTitle>
      <DialogContent style={{ paddingBottom: 24 }}>
        <DialogContentText style={{ textAlign: 'center', paddingBottom: 48 }}>
          Select Goals and Enter Data
        </DialogContentText>
        <Divider style={{ marginBottom: 24 }} />
        <div className="flex">
          <div>
            <Typography variant="subtitle2" className={classes.labelField}>
              Period Begins
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Total Annual Amount
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Annual Increase Until Next Period
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Your Ownership Share
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Your Amount
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Period Ends
            </Typography>
          </div>
          <div className="flex" style={{ marginLeft: 64 }}>
            { periods.length && (
              <>
                { periods.map((period, index) => (
                  <Period key={randomKey()} data={period} index={index} />
                ))}
              </>
            )}
            <div style={{ marginLeft: 32 }} className="flex flex--align-center">
              <MuiButton
                style={{ height: 42 }}
                onClick={onAddPeriod}
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

export default ProfitDialog;
