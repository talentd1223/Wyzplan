import * as React from 'react';
import {useRecoilState} from "recoil";
import Typography from "@material-ui/core/Typography";
import cx from "classnames";
import Divider from "@material-ui/core/Divider";
import DataAccordion from "../DataAccordion";
import {globalDataSections, loanDataState} from "../../store/Atoms";
import useStyles from "../../styles/Accordion.style";
import DollarMask from "../masks/DollarMask";
import PercentageMask from "../masks/PercentageMask";
import {createLoansData, randomKey} from "../../utils";
import OwnerSelect from "../OwnerSelect";
import Button from "../Button";
import EditableTable from "../EditableTable";

const ownerOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Joint', label: 'Joint' },
];

const typeOptions = [
  { value: 'Gifting', label: 'Use Gifting to Forgive' },
  { value: 'Repaid', label: 'Loan is Repaid' },
];

const howPaidOptions = [
  { value: 'Offset by Gifting', label: 'Offset by Gifting' },
  { value: 'Paid Annually', label: 'Paid Annually' },
];

interface LoanTypes {
  owner: string,
  type: string,
  description: string,
  loanBalance: string,
  interestRate: string,
  howPaid: string,
  annualGiftBegin: string,
  annualGiftAmount: string,
  payOffDate: string,
  originationDate: string,
  amountBorrowed: string,
  term: string,
  payment: string,
}

function Loans(): JSX.Element {
  const classes = useStyles();
  const [data, setData] = useRecoilState(loanDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [filteredGift, setFilteredGift] = React.useState<Array<LoanTypes>>([]);
  const [filteredRepaid, setFilteredRepaid] = React.useState<Array<LoanTypes>>([]);
  const giftColumns = React.useMemo(
    () => [
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Description", accessor: "description", type: 'input' },
      { Header: "Loan Balance", accessor: "loanBalance", type: 'input', inputMask: DollarMask },
      { Header: "Interest Rate", accessor: "interestRate", type: 'input', inputMask: PercentageMask },
      { Header: "Interest Plan", accessor: "howPaid", type: 'select', options: howPaidOptions },
      { Header: "Annual Begin Date", accessor: "annualGiftBegin", type: 'input' },
      { Header: "Annual Amount", accessor: "annualGiftAmount", type: 'input', inputMask: DollarMask },
      { Header: "Pay Off Date", accessor: "payOffDate", type: 'input' },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );
  const repaidColumns = React.useMemo(
    () => [
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Description", accessor: "description", type: 'input' },
      { Header: "Origination Date", accessor: "originationDate", type: 'input' },
      { Header: "Amount Borrowed", accessor: "amountBorrowed", type: 'input', inputMask: DollarMask },
      { Header: "Interest Rate", accessor: "interestRate", type: 'input', inputMask: PercentageMask },
      { Header: "Term", accessor: "term", type: 'input' },
      { Header: "Payment", accessor: "payment", type: 'input', inputMask: DollarMask },
      { Header: "Balance", accessor: "loanBalance", type: 'input', inputMask: DollarMask },
      { Header: "Pay Off Date", accessor: "payOffDate", type: 'input' },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );

  React.useEffect(() => {
    setFilteredGift(data.filter((item) => item.type === 'Gifting'));
    setFilteredRepaid(data.filter((item) => item.type === 'Repaid'));
  }, [data]);

  const updateMyData = (rowIndex: number, columnId: number, value: string, tableIndex?: number | undefined | null) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    let prevData = [];
    let newData = [];

    if (tableIndex === 0) {
      prevData = filteredGift.map((row: LoanTypes, index: number) => {
        if (index === rowIndex) {
          return { ...filteredGift[rowIndex], [columnId]: value };
        }
        return row;
      });
      newData = [...prevData, ...filteredRepaid];
    } else {
      prevData = filteredRepaid.map((row: LoanTypes, index: number) => {
        if (index === rowIndex) {
          return { ...filteredRepaid[rowIndex], [columnId]: value };
        }
        return row;
      });
      newData = [...prevData, ...filteredGift];
    }

    setData(newData);
  };

  const deleteRowData = (rowIndex: number, tableIndex?: number | undefined | null) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    let prevData = [];
    let newData = [];

    if (tableIndex === 0) {
      prevData = filteredGift.filter((row: LoanTypes, index: number) => index !== rowIndex);
      newData = [...prevData, ...filteredRepaid];
    } else {
      prevData = filteredRepaid.filter((row: LoanTypes, index: number) => index !== rowIndex);
      newData = [...prevData, ...filteredGift];
    }

    setData(newData);
  };

  const onSelectOwner = (event: React.ChangeEvent<{ value: unknown }>) => {
    setError('');
    setInputValue(event.target.value as string);
  }

  const onAddNew = (value: string) => {
    if (inputValue === '') {
      setError('Must Select Owner');
    } else {
      setData([
        createLoansData(inputValue, value, '', '', '', '', '', '', '', '', '', '', ''),
        ...data,
      ]);
      setInputValue('');
    }
  }


  return (
    <DataAccordion
      title="Loan(s) Owed to You"
      data={globalData.loans}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="loans"
    >
      <div style={{ marginBottom: 16, flexDirection: 'row' }} className="flex">
        <div style={{ marginRight: 20 }}>
          <Typography className={classes.inputLabel}>
            Select Owner
          </Typography>
          <OwnerSelect onChange={onSelectOwner} value={inputValue} ownerOptions={ownerOptions} />
          <Typography className={cx(classes.inputLabel, { error: error !== '' })}>
            {error}
          </Typography>
        </div>
        <Divider orientation="vertical" flexItem style={{marginRight: 20 }} />
        <div>
          <Typography className={classes.inputLabel}>
            Click Type to Add
          </Typography>
          <div>
            {typeOptions.map((option, index) => (
              <Button
                key={randomKey()}
                label={option.value}
                onClick={() => onAddNew(option.value)}
                style={{ marginRight: 8, marginTop: 8 }}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ overflowY: 'scroll', position: 'relative'}}>
        { filteredGift.length !== 0 && (
          <div style={{
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
                <Typography><b>Loan Type:</b> Gifting</Typography>
              </div>
            </div>
            <EditableTable
              columns={giftColumns}
              data={filteredGift}
              setData={setData}
              updateMyData={updateMyData}
              deleteRowData={deleteRowData}
              skipPageReset={skipPageReset}
              tableIndex={0}
            />
          </div>
        )}
        { filteredRepaid.length !== 0 && (
          <div style={{
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
                <Typography><b>Loan Type:</b> Repaid</Typography>
              </div>
            </div>
            <EditableTable
              columns={repaidColumns}
              data={filteredRepaid}
              setData={setData}
              updateMyData={updateMyData}
              deleteRowData={deleteRowData}
              skipPageReset={skipPageReset}
              tableIndex={1}
            />
          </div>
        )}
      </div>
    </DataAccordion>
  );
}

export default Loans;
