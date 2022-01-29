import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      boxShadow: 'none',
      border: 0,
      borderRadius: 5,
      '&::before': {
        height: 0,
      },
      background: 'transparent',
      '&.hidden': {
        display: 'none'
      },
      '&.editable': {
        display: 'block',
        opacity: 0.5
      }
    },
    input: {
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
      lineHeight:'16px',
      letterSpacing: '0.4px',
      color: 'rgba(0, 0, 0, 0.6)',
      marginBottom: 4,
      '&.error': {
        color: '#f44336',
        marginTop: 8
      }
    },
    editCell: {
      padding: 0,
      margin: 0,
      border: 0,
      background: "transparent",
      width: '100%',
      '& .MuiOutlinedInput-input': {
        minWidth: 20,
        padding: '12.5px 12px',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
        borderRadius: 0
      }
    },
    summary: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
    summaryWrap: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    summaryStat: {
      background: '#eeeeee',
      marginLeft: '16px',
      padding: '0.75em 1em',
      borderRadius: '5px',
      fontSize: '14px',
    },
    summaryStatWrap: {
      flex: 1,
      display: 'flex',
      justifyContent: 'space-around',
      maxWidth: '40%',
    },
    reverseSummary: {
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      flexDirection: 'row-reverse',
      paddingLeft: 0,
      background: 'white',
    },
    details: {
      flexDirection: 'column',
      background: 'transparent',
      border: 'none',
      padding: 0,
      '&.white': {
        background: 'white',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderTop: 'none',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
      }
    },
    content: {
      maxHeight: 400,
      background: '#FFF',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderTop: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: 20,
    },
    guide: {
      marginTop: 8,
      minHeight: 200,
      background: '#FFF',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    addInstitution: {
      padding: 12,
      background: 'white',
      borderTop: '1px solid gainsboro',
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
    buttonWrapper: {
      background: 'white',
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4,
    },
    cellButton: {
      height: '100%',
      minWidth: 150,
      width: '100%',
      justifyContent: 'flex-start',
      padding: '10px 9px',
      borderRadius: 0,
      textTransform: 'inherit',
      fontSize: 16,
    },
    toggleButton: {
      marginLeft: 10,
      width: 30,
      minWidth: 30,
      height: 30,
      padding: '5px 16px',
      "&.active": {
        background: 'black',
        color: 'white'
      }
    },
    popover: {
      backgroundColor: 'rgba(0,0,0,0.15)',
      '& > .MuiPopover-paper': {
        width: 'calc(100% - 118px)',
        height: 400,
      }
    },
    popoverClose: {
      position: 'absolute',
      right: 12,
      top: 12,
    },
    popoverTextField: {
      width: 400,
      '& > .MuiInputLabel-outlined': {
        transform: 'translate(14px, 15px) scale(1)',
      },
      '& > .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -6px) scale(0.75)',
      },
      '& > .MuiOutlinedInput-root > .MuiOutlinedInput-input': {
        padding: '12.5px 14px',
      }
    },
    tabs: {
      marginTop: 24
    },
    listItem: {
      '& > .MuiListItemText-root': {
        display: 'flex',
        alignItems: 'center',
      },
      '& > .MuiListItemText-root > .MuiListItemText-secondary': {
        marginLeft: 24,
      }
    },
    selectButton: {
      "&.active": {
        background: 'black',
        color: 'white'
      }
    },
    formSubmitWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 8,
      right: 8,
    },
    bizCardTitle: {
      marginBottom:'0.5rem',
      paddingBottom:'0.5rem',
      borderBottom:'1px solid',
    }
  }),
);
