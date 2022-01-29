import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import cx from 'classnames';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Divider from "@material-ui/core/Divider";
import MuiButton from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {randomKey} from "../../utils";
import useStyles from '../../styles/ToolBar.style';

const planOptions = [
  { value: 'plan', label: 'Plan' },
];

const workspaceOptions = [
  { value: 'edit', label: 'Edit' },
];

const functionOptions = [
  { value: 'single section', label: 'Single Section' },
];

function ToolBar(): JSX.Element {
  const classes = useStyles();
  const [workspaceType, setWorkspaceType] = React.useState<string>('edit');
  const [functionType, setFunctionType] = React.useState<string>('single section');
  const [planType, setPlanType] = React.useState<string>('plan');

  const onSelectType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWorkspaceType(event.target.value as string);
  };

  return (
    <div className={cx("flex flex--align-center", classes.wrapper)}>
      <div>
        <Typography><b>Workspace:</b></Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            value={workspaceType}
            onChange={onSelectType}
            className={classes.selectField}
          >
            {workspaceOptions.map((option: OptionTypes) => (
              <MenuItem key={randomKey()} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Divider style={{ marginLeft: 24, marginRight: 24 }} orientation="vertical" flexItem />
      <div className="flex flex--column">
        <FormControl variant="outlined" className={classes.formControl}>
          <Typography><b>Plan: </b></Typography>
          <Select
            style={{width: 150, marginLeft: 12}}
            value={planType}
            onChange={(event) => setPlanType(event.target.value as string)}
            className={classes.selectField}
          >
            {planOptions.map((option: OptionTypes) => (
              <MenuItem key={randomKey()} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Typography><b>Function: </b></Typography>
          <Select
            style={{width: 150, marginLeft: 12}}
            value={functionType}
            onChange={(event) => setFunctionType(event.target.value as string)}
            className={classes.selectField}
          >
            {functionOptions.map((option: OptionTypes) => (
              <MenuItem key={randomKey()} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Typography>{' '}</Typography>
          <Select
            style={{width: 150, marginLeft: 12 }}
            value={workspaceType}
            onChange={onSelectType}
            className={classes.selectField}
          >
            {workspaceOptions.map((option: OptionTypes) => (
              <MenuItem key={randomKey()} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.scoreCard}>
        <div className={classes.scoreCardInner}>100</div>
      </div>
      <Divider style={{ marginLeft: 24, marginRight: 24 }} orientation="vertical" flexItem />
      <div className="flex flex--align-center">
        <MuiButton
          style={{ height: 42 }}
          onClick={() => console.log('silence')}
          startIcon={<AddCircleOutlineIcon fontSize="large" />}
        >
          Add Plan
        </MuiButton>
      </div>
    </div>
  )
}

export default ToolBar;
