import * as React from 'react';
import {useRecoilState} from "recoil";
import cx from 'classnames';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import MuiButton from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {brokeragesDataState, globalDataSections} from "../../store/Atoms";
import DataAccordion from "../DataAccordion";
import Button from "../Button";
import {
  createAllocationData,
  createBrokerageAcctData,
  createBrokerageData,
} from "../../utils";
import useStyles from "../../styles/Accordion.style";
import EditableTable from "../EditableTable";
import DollarMask from "../masks/DollarMask";
import OwnerSelect from "../OwnerSelect";

const ownerOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Joint', label: 'Joint' },
];

const taxCatOptions = [
  { value: 'Taxable & Tax Free', label: 'Taxable & Tax Free' },
  { value: 'Roth', label: 'Roth' },
  { value: 'Tax Deferred', label: 'Tax Deferred' },
  { value: 'Taxable', label: 'Taxable' },
  { value: 'Traditional IRA', label: 'Traditional IRA' },
];

type IndexTypes = number | undefined | null;

function Brokerages(): JSX.Element {
  const classes = useStyles();
  const [data, setData] = useRecoilState(brokeragesDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const columns = React.useMemo(
    () => [
      { Header: "Account", accessor: "name", type: 'input' },
      { Header: "Tax Category", accessor: "taxCategory", type: 'select', options: taxCatOptions },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
      { Header: "Tax Free", accessor: "taxFreeValue", type: 'input', inputMask: DollarMask },
      { Header: "Cost Basis", accessor: "costBasis", type: 'input', inputMask: DollarMask },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );

  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };

  const onAddNew = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (inputValue === '') {
      setError('Must Add Name');
    } else {
      setData([
        createBrokerageData(
          inputValue,
          event.target.value as string,
          false,
          []
        ),
        ...data,
      ]);
      setInputValue('');
    }
  }

  const onInputChange = (value: string) => {
    if (value !== '') setError('');
    setInputValue(value);
  }

  const updateMyData = (rowIndex: number, columnId: number, value: string, tableIndex?: IndexTypes, holdingIndex?: IndexTypes) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    if (tableIndex !== null && rowIndex !== null && holdingIndex !== null) {
      updateHoldingData(rowIndex, columnId, value, tableIndex, holdingIndex);
    } else if (tableIndex !== null && rowIndex !== null) {
      updateAccountData(rowIndex, columnId, value, tableIndex);
    } else if (rowIndex !== null) {
      setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return { ...row, [columnId]: value };
          }
          return row;
        })
      );
    }
  };

  const updateHoldingData = (rowIndex: number, columnId: number, value: string, tableIndex?: IndexTypes, holdingIndex?: IndexTypes) => {
    setData((old) =>
      old.map((row, tblIdx) => {
        if (tblIdx === tableIndex) {
          const prevAccts = [...row.accounts];
          return {
            ...row,
            accounts: prevAccts.map((item, acctIdx) => {
              if (acctIdx === holdingIndex) {
                const prevHoldings = [...item.holdings];
                return {
                  ...item,
                  holdings: prevHoldings.map((holdingItem, hldIdx) => {
                    if (hldIdx === rowIndex) {
                      return { ...holdingItem, [columnId]: value }
                    }
                    return holdingItem;
                  })
                }
              }
              return item;
            })
          };
        }
        return row;
      })
    );
  }

  const deleteHoldingData = (rowIndex: number, tableIndex?: IndexTypes, holdingIndex?: IndexTypes) => {
    console.log(rowIndex, tableIndex, holdingIndex);
    setData((old) =>
      old.map((row, tblIdx) => {
        if (tblIdx === tableIndex) {
          const prevAccts = [...row.accounts];
          return {
            ...row,
            accounts: prevAccts.map((item, acctIdx) => {
              if (acctIdx === holdingIndex) {
                const prevHoldings = [...item.holdings];
                return {
                  ...item,
                  holdings: prevHoldings.filter(
                    (holdingItem, index) => index !== rowIndex
                  )
                }
              }
              return item;
            })
          };
        }
        return row;
      })
    );
  }

  const updateAccountData = (rowIndex: number, columnId: number, value: string, tableIndex?: IndexTypes) => {
    setData((old) =>
      old.map((row, tblIdx) => {
        if (tblIdx === tableIndex) {
          const prevAccts = [...row.accounts];
          return {
            ...row,
            accounts: prevAccts.map((item, acctIdx) => {
              if (acctIdx === rowIndex) {
                return { ...item, [columnId]: value }
              }
              return item;
            })
          };
        }
        return row;
      })
    );
  }

  const addAccountData = (tableIndex: number) => {
    const newAcctData = createBrokerageAcctData('', '', 0, false, 0, 0, [],
      createAllocationData('enter', '', null, null, null)
    )

    setData((old) =>
      old.map((row, tblIdx) => {
        if (tblIdx === tableIndex) {
          return {...old[tableIndex], accounts: [newAcctData, ...row.accounts]};
        }
        return row;
      })
    );
  }

  const deleteAccountData = (rowIndex: number, tableIndex?: IndexTypes) => {
    setData((old) =>
      old.map((row, tblIdx) => {
        if (tblIdx === tableIndex) {
          const prevAccts = [...row.accounts];
          return {
            ...old[tableIndex],
            accounts: prevAccts.filter(
              (item, index) => index !== rowIndex
            )
          };
        }
        return row;
      })
    );
  }

  const deleteRowData = (rowIndex: number, tableIndex?: IndexTypes, holdingIndex?: IndexTypes) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    if (tableIndex !== null && rowIndex !== null && holdingIndex !== null) {
      deleteHoldingData(rowIndex, tableIndex, holdingIndex);
    } else if (tableIndex !== null && rowIndex !== null) {
      deleteAccountData(rowIndex, tableIndex);
    } else if (rowIndex !== null) {
      setData((old) =>
        old.filter((row, index) => index !== rowIndex)
      );
    }
  };

  return (
    <DataAccordion
      title="Investment & Savings Accounts"
      data={globalData.brokerages}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="brokerages"
    >
      <div style={{ marginBottom: 8 }} className="flex">
        <div style={{ marginRight: 20 }}>
          <Typography className={classes.inputLabel}>
            Name of Firm
          </Typography>
          <TextField
            style={{marginTop: 4}}
            error={error !== ''}
            helperText={error !== '' ? error : null}
            className={classes.input}
            label=""
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            variant="outlined"
            size="small"
            inputProps={{
              placeholder: 'Enter Name'
            }}
          />
        </div>
        <Divider orientation="vertical" flexItem />
        <div style={{ marginLeft: 20 }}>
          <Typography className={classes.inputLabel}>
            Click Owner to Add
          </Typography>
          <OwnerSelect onChange={onAddNew} value={inputValue} ownerOptions={ownerOptions} />
        </div>
      </div>
      <div style={{ overflowY: 'scroll', position: 'relative'}}>
        {data.map((broker, index) => (
          <div key={broker.name + broker.owner} style={{
            border: '1px solid rgba(0, 0, 0, 0.12)',
            background: 'white',
            padding: 9,
            marginTop: 8
          }}>
            <div className="flex flex--justify-sb" style={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              padding: '10px 12px',
              paddingRight: 6,
              marginTop: 25
            }}>
              <div className="flex">
                <Typography><b>Broker:</b> {broker.name}</Typography>
                <Typography style={{ marginLeft: 30  }}><b>Owner:</b> {broker.owner}</Typography>
              </div>
              <div style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center'}}>
                <Typography><b>Margin Loan:</b></Typography>
                <MuiButton className={cx(classes.toggleButton, { active: checked })} variant="outlined" onClick={toggleChecked}>
                  {checked ? 'Y' : 'N'}
                </MuiButton>
              </div>
              <IconButton
                color="primary"
                size="small"
                aria-label="delete"
                onClick={() => deleteRowData(index, null, null)}
              >
                <CloseIcon fontSize="small" color="action" />
              </IconButton>
            </div>
            <EditableTable
              columns={columns}
              data={broker.accounts}
              setData={setData}
              updateMyData={updateMyData}
              deleteRowData={deleteRowData}
              skipPageReset={skipPageReset}
              tableIndex={index}
            />
            <div style={{ marginTop: 12 }}>
              <Button onClick={() => addAccountData(index)} label="+ Add Account" small={false} />
            </div>
          </div>
        ))}
      </div>
    </DataAccordion>
  );
}

export default Brokerages;
