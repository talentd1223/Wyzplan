import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '45%',
      margin: '0 auto',
      height: 'calc(100vh - 200px)',
      justifyContent: 'center',
    },
    card: {
      height: 550,
      display: 'flex',
      flexDirection: 'column',
      padding: 40,
      justifyContent: 'center'
    }
  }),
);
