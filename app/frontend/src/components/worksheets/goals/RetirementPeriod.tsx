/* eslint-disable @typescript-eslint/ban-ts-comment */
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import useStyles from "../../../styles/Period.style";

interface PeriodPropTypes {
  data: RetirementPeriodsTypes,
  index: number
}

function Period({ data, index }: PeriodPropTypes): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.periodWrapper}>
      <Typography className={classes.periodTitle} variant="subtitle2">
        Period {index + 1}
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
    </div>
  );
}

export default Period;
