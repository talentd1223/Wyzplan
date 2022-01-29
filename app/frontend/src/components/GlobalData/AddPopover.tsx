import * as React from 'react';
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import useStyles from '../../styles/Popover.style';

interface PopoverProps {
  id: string | undefined,
  anchorEl:  Element | ((element: Element) => Element) | null | undefined,
  children: JSX.Element | JSX.Element[],
  open: boolean,
  onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function AddPopover({ id, anchorEl, children, open, onClose }: PopoverProps): JSX.Element {
  const classes = useStyles();
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      className={classes.popover}
    >
      <div style={{ padding: 24 }}>
        <IconButton onClick={onClose} className={classes.popoverClose} size="small">
          <CloseIcon fontSize="inherit" />
        </IconButton>
        {children}
      </div>
    </Popover>
  )
}

export default AddPopover;
