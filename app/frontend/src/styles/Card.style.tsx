import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 228,
      height: 137,
      marginTop: 12,
      marginRight: 12,
    },
    cardTitle: {
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: '0.15px',
      color: '#000000',
    },
    cardLabel: {
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '0.25px',
      color: 'rgba(0, 0, 0, 0.6)',
      marginTop: 4,
    },
    cardActions: {
      height: 34,
      padding: 0,
      borderTop: '1px solid rgba(0, 0, 0, 0.2)',
    },
    cardButton: {
      padding: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    cardLink: {
      padding: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  }),
);
