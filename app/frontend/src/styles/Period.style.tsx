import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    periodWrapper: {
      marginLeft: 24,
      display: 'flex',
      flexDirection: 'column'
    },
    periodTitle: {
      position: 'absolute',
      marginTop: -48,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    },
    labelField: {
      height: 36,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 12,
      whiteSpace: 'nowrap'
    },
    input: {
      width: 106,
      marginBottom: 12,
      '& .MuiInputBase-root': {
        fontSize: 14
      },
      '& .MuiOutlinedInput-input': {
        minWidth: 20,
        padding: '9.7px 8px',
      },
      '& .MuiFormHelperText-contained': {
        marginLeft: 0
      }
    },
    inputLabel: {
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: '0.4px',
      color: 'rgba(0, 0, 0, 0.6)',
      marginBottom: 4,
      '&.error': {
        color: '#f44336',
        marginTop: 8
      }
    },
  })
);
