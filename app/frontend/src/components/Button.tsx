import * as React from 'react';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import useStyles from '../styles/Button.style';

function MaterialButton({
  label,
  onClick,
  small = false,
  style = {},
  selectable = false,
  active = false,
  actionable = false,
  disabled = false,
}: ButtonProps): JSX.Element {
  const classes = useStyles();

  return (
    <Button
      style={style}
      onClick={onClick}
      className={cx(classes.root, { small, selectable, active, actionable })}
      variant="outlined"
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignores
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

export default MaterialButton;
