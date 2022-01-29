import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      width: '100%',
      minHeight: 400,
      '& > .MuiDialog-container > .MuiDialog-paper': {
        height: 400
      }
    },
  }),
);
