import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {randomKey} from "../utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: 4,
      minWidth: 200,
      '& > .MuiInputLabel-outlined': {
        transform: 'translate(14px, 11px) scale(1)',
        fontSize: 14,
      },
      '&  > .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
      }
    },
    selectField: {
      '& > .MuiOutlinedInput-input': {
        padding: '8.5px 14px',
      }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

function OwnerSelect({ onChange, value, ownerOptions }: OwnerSelectProps): JSX.Element {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="owner-select">Owner</InputLabel>
      <Select
        labelId="owner-select"
        id="owner-select"
        value={value}
        onChange={onChange}
        label="Owner"
        className={classes.selectField}
      >
        {ownerOptions.map((option: OptionTypes) => (
          <MenuItem key={randomKey()} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default OwnerSelect;
