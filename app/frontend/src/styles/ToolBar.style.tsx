import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      border: '1px solid #AAAAAA',
      background: 'white',
      padding: 20,
      borderRadius: 5,
    },
    formControl: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4,
      minWidth: 200,
      '& > .MuiInputLabel-outlined': {
        transform: 'translate(14px, 11px) scale(1)',
        fontSize: 14,
      },
      '&  > .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
      }
    },
    selectField: {
      width: '100%',
      '& > .MuiOutlinedInput-input': {
        padding: '8.5px 14px',
      }
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    scoreCard: {
      width: 110,
      height: 110,
      borderRadius: '100%',
      background: '#FFFFFF',
      border: '1px solid #AAAAAA',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 24
    },
    scoreCardInner: {
      width: 88,
      height: 88,
      background: '#F7F7F7',
      border: '1px solid #AAAAAA',
      borderRadius: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
  }),
);
