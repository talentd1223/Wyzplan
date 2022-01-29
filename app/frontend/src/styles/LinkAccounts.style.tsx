import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500,
      '& > div': {
        marginTop: 25,
        marginBottom: 25
      },
    },
  }),
);
