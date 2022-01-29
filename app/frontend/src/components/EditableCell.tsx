import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "../styles/Accordion.style";

interface RowTypes {
  index: number
}

interface ColumnTypes {
  id:  string,
  type: string,
  options: Array<OptionTypes>,
  inputMask: JSX.Element,
}

interface CellTypes {
  width: string | number,
  value: string,
  row: RowTypes,
  column: ColumnTypes,
  tableIndex: number,
  holdingIndex: number | undefined | null,
  updateMyData: (
    index: number,
    id: number | string | undefined,
    value: string,
    tableIndex: number,
    holdingIndex?: number | undefined | null
  ) => void;
}

// Create an editable cell renderer
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const EditableCell = ({
  width = 'inherit',
  value: initialValue,
  row: { index },
  column: {
    id,
    type,
    options,
    inputMask
  },
  tableIndex,
  holdingIndex = null,
  updateMyData // This is a custom function that we supplied to our table instance
}: CellTypes): JSX.Element => {
  const classes = useStyles();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value, tableIndex, holdingIndex);
  };

  // If the initialValue is changed externally, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  switch (type) {
    case 'select':
    return (
      <TextField
        style={{ minWidth: 170 }}
        className={classes.editCell}
        select
        label=""
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
      >
        {options.map((option: OptionTypes) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
    default:
      // silence for now
  }

  return (
    <TextField
      style={{ width }}
      className={classes.editCell}
      value={value}
      onChange={onChange}
      variant="outlined"
      onBlur={onBlur}
      InputProps={{
        // eslint-disable-next-line
        inputComponent: inputMask as any,
      }}
    />
  );
};

export default EditableCell;
