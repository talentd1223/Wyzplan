import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
    accountList: {
      paddingLeft: theme.spacing(4),
    },
  }),
);
