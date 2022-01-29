import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: 'black',
      backgroundColor: 'transparent',
      borderRadius: 4,
      fontSize: 14,
      '&.small': {
        height: 24,
        fontSize: 14,
      },
      '&.active': {
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
        },
      },
      '&.actionable': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(0, 0, 0, 0.12)',
      },
      '&.selectable': {
        background: 'transparent',
        color: 'black',

        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
        },
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
      },
    },
  }),
);
