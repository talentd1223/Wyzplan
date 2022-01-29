import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    globalDataProgressWrapper: {
      position: 'fixed',
      width: 'calc(100% - 70px)',
      left: 70,
      height: 44,
      top: 64,
      paddingLeft: 30,
      paddingRight: 42,
      paddingTop: 12,
      background: 'white',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      zIndex: 9
    },
  }),
);
