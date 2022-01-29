import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useRecoilValue} from "recoil";
import useStyles from "../../styles/ProgressBar.style";
import {globalDataSections} from "../../store/Atoms";

function ProgressBar(): JSX.Element {
  const classes = useStyles();
  const globalData = useRecoilValue(globalDataSections);

  const completed = Object.fromEntries(
    Object.entries(globalData).filter(([_, value]) => value.completed)
  );
  const numCompleted = Object.keys(completed).length;

  return (
    <div className={classes.globalDataProgressWrapper}>
      <Box display="flex" alignItems="center">
        <Box minWidth={100}>
          <Typography variant="body2" style={{
            fontWeight: 600,
            whiteSpace: 'nowrap',
            fontSize: 13,
          }}>{numCompleted}/18 complete</Typography>
        </Box>
        <Box width="100%" ml={2}>
          <LinearProgress variant="determinate" value={ numCompleted / 18 * 100} />
        </Box>
      </Box>
    </div>
  )
}

export default ProgressBar;
