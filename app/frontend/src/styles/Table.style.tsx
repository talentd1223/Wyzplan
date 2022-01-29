import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    row: {
      height: 45,
      minHeight: 45
    },
    input: {
      '& .MuiInputBase-root': {
        fontSize: 14
      },
      '& .MuiOutlinedInput-input': {
        minWidth: 20,
        padding: '5px 8px',
      },
    },
    select: {
      '& .MuiInputBase-root': {
        fontSize: 14
      },
      '& .MuiOutlinedInput-input': {
        minWidth: 80,
        padding: '5px 8px',
      },
    },
    inputTiny: {
      '& .MuiInputBase-root': {
        fontSize: 14
      },
      '& .MuiOutlinedInput-input': {
        minWidth: 30,
        maxWidth: 30,
        padding: '5px 8px',
      },
    },
    editableTableHead: {
      '& .MuiTableCell-head': {
        padding: '4px 12px',
        fontWeight: 600
      }
    },
    editableActions: {
      padding: '0px 6px',
      textAlign: 'right',
    }
  }),
);
