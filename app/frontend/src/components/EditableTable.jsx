/* eslint-disable */
import React from "react";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {
  usePagination,
  useSortBy,
  useTable,
  useExpanded
} from "react-table";
import EditableCell from "./EditableCell";
import useStyles from '../styles/Table.style';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import AlertDialog from "./AlertDialog";
import Typography from "@material-ui/core/Typography";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = { Cell: EditableCell };

const EditableTable = ({
  columns,
  data,
  setData,
  updateMyData,
  skipPageReset,
  deleteRowData,
  renderRowSubComponent = ({row}) => {},
  tableIndex = null,
  holdingIndex =  null
}) => {
  const classes = useStyles();
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
      tableIndex,
      holdingIndex,
    },
    useSortBy,
    useExpanded,
    usePagination,
  );
  const [openState, setOpenState] = React.useState({
    index: -1,
    open: false,
    entity: null
  });

  // Render the UI for your table
  return (
    <>
      <TableContainer style={{marginTop: 8}}>
        <MaUTable {...getTableProps()}>
          <TableHead className={classes.editableTableHead}>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    style={{ fontWeight: 600 }}
                    {...(column.id === "selection"
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render("Header")}
                    {column.id !== "selection" || column.id !== 'actions' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <React.Fragment {...row.getRowProps()}>
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      if (cell.column.id === 'actions') {
                        return (
                          <TableCell className={classes.editableActions}>
                            <IconButton
                              color="primary"
                              size="small"
                              aria-label="delete"
                              onClick={() => setOpenState({
                                index: index,
                                entity: null,
                                open: true,
                              })}
                            >
                              <CloseIcon fontSize="small" color="action" />
                            </IconButton>
                          </TableCell>
                        )
                      }
                      return (
                        <TableCell style={{ padding: 0 }} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {row.cells.map((cell) => {
                    if (cell.column.id === 'hasHoldings') {
                      return (
                        <TableRow>
                          <td colSpan="2" />
                          <td colSpan="5">
                            <Collapse in={row.original.hasHoldings}>
                              {renderRowSubComponent({ tableIndex, index, row })}
                            </Collapse>
                          </td>
                        </TableRow>
                      )
                    }
                  })}
                </React.Fragment>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
      <AlertDialog
        open={openState.open}
        setOpen={(value) => setOpenState({
          index: -1,
          entity: null,
          value: value,
        })}
        onConfirm={() => deleteRowData(openState.index, tableIndex, holdingIndex)}
        title="Are you sure?"
      >
        <Typography>
          You are about to delete this item, please confirm below.
        </Typography>
      </AlertDialog>
    </>
  );
};

export default EditableTable;
