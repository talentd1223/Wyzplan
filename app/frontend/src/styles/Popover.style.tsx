import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      backgroundColor: 'rgba(0,0,0,0.15)',
      '& > .MuiPopover-paper': {
        width: 'calc(70% - 118px)',
        minHeight: 500,
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
  }),
);
