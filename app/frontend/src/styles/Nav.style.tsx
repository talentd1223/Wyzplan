import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    listItem: {
      whiteSpace: 'nowrap'
    },
    directional: {
      top: 'auto',
      bottom: 0,
      background: 'white',
      borderTop: '1px solid #D8D8D8',
      boxShadow: 'none'
    },
    directionalToolBar: {
      marginLeft: 70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 0,
      position: 'relative',
    },
    directionalBtn: {
      height: 64,
      minWidth: 125,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    directionalLabel: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '24px',
      letterSpacing: '0.15px',
      textTransform: 'capitalize',
    },
    directionalDotWrapper: {
      display: 'flex',
      justifyContent: 'space-around',
      width: 85,
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, 0)',
    },
    directionalDot: {
      width: 10,
      height: 10,
      background: '#C4C4C4',
      borderRadius: '100%',
      transition: '300ms all ease',

      '&.active': {
        background: '#000000',
      }
    }
  }),
);
