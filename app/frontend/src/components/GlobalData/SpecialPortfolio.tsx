import * as React from 'react';
import {useRecoilState} from "recoil";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DataAccordion from "../DataAccordion";
import {globalDataSections, portfolioDataState} from "../../store/Atoms";
import useStyles from "../../styles/Accordion.style";
import DollarMask from "../masks/DollarMask";
import {
  createPortfolioAcctData,
  createPortfolioData,
  randomKey
} from "../../utils";
import Button from "../Button";
import EditableTable from "../EditableTable";

const taxCatOptions = [
  { value: 'Taxable', label: 'Taxable' },
  { value: 'Roth', label: 'Roth' },
  { value: 'Pre Tax', label: 'Pre Tax' },
  { value: 'Muni Bond', label: 'Muni Bond' },
  { value: 'Tax Deferred', label: 'Tax Deferred' },
];

function SpecialPortfolio(): JSX.Element {
  const classes = useStyles();
  const [data, setData] = useRecoilState(portfolioDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState('');
  const columns = React.useMemo(
    () => [
      { Header: "Firm", accessor: "firm", type: 'input' },
      { Header: "Account", accessor: "account", type: 'input' },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );

  const onInputChange = (value: string) => {
    if (value !== '') {
      setError('');
    }

    setInputValue(value);
  }

  const onAddNew = (value: string) => {
    if (inputValue === '') {
      setError('Must Add Name');
    } else {
      setData([
        createPortfolioData(inputValue, '', value, []),
        ...data,
      ]);
      setInputValue('');
    }
  }

  const updateMyData = (rowIndex: number, columnId: string | number, value: string | number, tableIndex?: number | undefined | null) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    if (tableIndex !== null && rowIndex !== null) {
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

  const updateAccountData = (rowIndex: number, columnId: string | number, value: string | number, tableIndex?: number | undefined | null) => {
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
    const newAcctData = createPortfolioAcctData('', '', '');

    setData((old) =>
      old.map((row, tblIdx) => {
        if (tblIdx === tableIndex) {
          return {...old[tableIndex], accounts: [newAcctData, ...row.accounts]};
        }
        return row;
      })
    );
  }

  const deleteAccountData = (rowIndex: number, tableIndex: number | undefined | null) => {
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

  const deleteRowData = (rowIndex: number, tableIndex?: number | undefined | null) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);

    if (tableIndex !== null && rowIndex !== null) {
      deleteAccountData(rowIndex, tableIndex);
    } else if (rowIndex !== null) {
      setData((old) =>
        old.filter((row, index) => index !== rowIndex)
      );
    }
  };

  return (
    <DataAccordion
      title="Special Portfolio"
      data={globalData.specialPortfolio}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="specialPortfolio"
    >
      <div className="flex">
        <div style={{ marginRight: 20 }}>
          <Typography className={classes.inputLabel}>
            Enter Portfolio Name
          </Typography>
          <TextField
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
            Click Type of Legal Structure to Add
          </Typography>
          <div>
            {taxCatOptions.map((option, index) => (
              <Button
                key={randomKey()}
                label={option.value}
                onClick={() => onAddNew(option.value)}
                style={{ marginLeft: index === 0 ? 0 : 8}}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ overflowY: 'scroll', position: 'relative'}}>
        {data.map((portfolio, index) => (
          <div key={portfolio.name + portfolio.type} style={{
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
                <Typography><b>Portfolio:</b> {portfolio.name}</Typography>
                <Typography style={{ marginLeft: 30  }}><b>Type:</b> {portfolio.type}</Typography>
              </div>
              <IconButton
                color="primary"
                size="small"
                aria-label="delete"
                onClick={() => deleteRowData(index, null)}
              >
                <CloseIcon fontSize="small" color="action" />
              </IconButton>
            </div>
            <EditableTable
              columns={columns}
              data={portfolio.accounts}
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

export default SpecialPortfolio;
