import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
      },
      '& > .MuiPaper-root': {
        width: 300,
        maxWidth: 300,
      }
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid black',
      padding: '20px 16px',
    }
  }),
);
