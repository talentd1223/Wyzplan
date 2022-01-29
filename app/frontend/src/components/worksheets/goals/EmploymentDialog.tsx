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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {employmentDialogActive} from "../../../store/Atoms";
import {randomKey} from "../../../utils";
import useStyles from '../../../styles/Period.style';
import Period from './EmploymentPeriod';
import RetirementFields from "./RetirementFields";
import RetirementPeriod from "./RetirementPeriod";

function EmploymentDialog({ business, setBusiness }: GoalDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useRecoilState(employmentDialogActive);
  const goals = business ? [...business.goals] : [];
  const employmentGoal = goals.find(o => o.type === 'employment');
  const [periods, setPeriods] = React.useState<Array<PeriodsTypes>>(
    employmentGoal ? [...employmentGoal.periods] : [{
      periodBegins: '',
      periodEnds: '',
      totalAnnualIncome: '',
      annualIncrease: ''
    }]
  );
  const [retirementPeriods, setRetirementPeriods] = React.useState<Array<RetirementPeriodsTypes>>(
    [{
      periodBegins: '',
      contributions: '',
      traditionalIra: '',
      rothIra: '',
      afterTax: '',
    }]
  );
  const [retirementCheck, setRetirementCheck] = React.useState(false);

  const onAddPeriod = () => {
    setPeriods([
      ...periods,
      {
        periodBegins: '',
        periodEnds: '',
        totalAnnualIncome: '',
        annualIncrease: ''
      }
    ])
  };

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

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetirementCheck(event.target.checked);
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={() => setOpen(!open)}>
      <DialogTitle style={{ textAlign: 'center', paddingBottom: 0 }}>
        Adding Goals for {business?.name}: Employment
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
              Total Annual Income C$
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Annual Increase Until Next Period
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Period Ends
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Income End of Period F$
            </Typography>
            <Typography variant="subtitle2" className={classes.labelField}>
              Income End of Period C$
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
        <div style={{ marginTop: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={retirementCheck}
                onChange={handleChecked}
                name="retirement-checked"
                color="primary"
              />
            }
            labelPlacement="start"
            label={`Are you making (or plan to make in the future) contributions to a Retirement Plan at ${business?.name}?`}
          />
        </div>
        { retirementCheck && (
          <>
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
          </>
        )}
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

export default EmploymentDialog;
