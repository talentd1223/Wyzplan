/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles =  makeStyles((theme: Theme) =>
  createStyles({
    input: {
      width: 106,
      marginLeft: 12,
      '& .MuiInputBase-root': {
        fontSize: 14
      },
      '& .MuiOutlinedInput-input': {
        minWidth: 20,
        padding: '9.7px 8px',
      },
      '& .MuiFormHelperText-contained': {
        marginLeft: 0
      }
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 14,
      marginLeft: 14,
    }
  })
);

function RetirementFields(): JSX.Element {
  const classes = useStyles();
  return (
    <section className="flex flex--align-center flex--wrap">
      <div className={classes.inputWrapper}>
        <Typography variant="subtitle2">Plan Type</Typography>
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
      <div className={classes.inputWrapper}>
        <Typography variant="subtitle2">Employer Match</Typography>
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
      <div className={classes.inputWrapper}>
        <Typography variant="subtitle2">X of First</Typography>
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
      <div className={classes.inputWrapper}>
        <Typography variant="subtitle2">Then </Typography>
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
      <div className={classes.inputWrapper}>
        <Typography variant="subtitle2">of next %</Typography>
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
      <div className={classes.inputWrapper}>
        <Typography variant="subtitle2">Your Contributions</Typography>
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
    </section>
  );
}

export default RetirementFields;
