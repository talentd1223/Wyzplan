import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const drawerWidth = 70;

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: drawerWidth,
      display: 'flex',
    },
    globalHeader: {
      marginBottom: 16,
      position: 'fixed',
      top: 40,
      width: '100%',
      left: 0,
      paddingLeft: 94,
      paddingRight: 40,
      background: 'white',
      zIndex: 9,
      borderBottom: '1px solid gainsboro',
      paddingTop: 8,
      paddingBottom: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 41,
      transition: 'all 300ms'
    },
    drawerPaperFull: {
      width: 304,
      marginTop: 41,
      transition: 'all 300ms'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
      minHeight: '40px !important'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      // paddingTop: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    appBar: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      background: 'white',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      boxShadow: 'none',
      minHeight: 40
    }
  }),
);
