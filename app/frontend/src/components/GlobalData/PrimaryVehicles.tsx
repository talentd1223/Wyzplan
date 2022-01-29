/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import MuiButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import cx from "classnames";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import useStyles from "../../styles/Accordion.style";
import {primaryVehicleDataState, dialogCellActive, globalDataSections} from "../../store/Atoms";
import DollarMask from "../masks/DollarMask";
import {
  createPrimaryVehicleData,
  numberWithCommas,
  randomKey
} from "../../utils";
import Button from "../Button";
import EditableTable from "../EditableTable";
import DataAccordion from "../DataAccordion";
import AddPopover from "./AddPopover";

const ownerOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Joint', label: 'Joint' },
  { value: 'Leasing Company', label: 'Leasing Company' },
];

const driverOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Both', label: 'Both' },
];

const FormSchema = Yup.object().shape({
  driver: Yup.string().required('Please select a Driver'),
  owner: Yup.string().required('Please select an Owner'),
});

const formFields = {
  driver: '',
  owner: '',
  make: '',
  model: '',
  year: '',
  value: '',
  debt: '',
  payment: '',
  endDate: '',
};

interface VehicleTypes {
  driver: string,
  owner: string,
  make: string,
  model: string,
  year: string,
  value: string,
  debt: string,
  payment: string,
  endDate: string,
}

type CellType = {
  value: string;
}

function PrimaryVehicles(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const setOpen = useSetRecoilState(dialogCellActive);
  const [data, setData] = useRecoilState(primaryVehicleDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [filteredOwned, setFilteredOwned] = React.useState<Array<VehicleTypes>>([]);
  const [filteredLease, setFilteredLease] = React.useState<Array<VehicleTypes>>([]);
  const ownItColumns = React.useMemo(
    () => [
      { Header: "Driver", accessor: "driver", type: 'select', options: driverOptions },
      { Header: "Make", accessor: "make", type: 'input' },
      { Header: "Model", accessor: "model", type: 'input' },
      { Header: "Year", accessor: "year", type: 'input' },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
      {
        Header: "Debt",
        accessor: "debt",
        type: 'input',
        // eslint-disable-next-line react/display-name
        Cell: ({ value }: CellType) => (
          <MuiButton
            style={{ display: 'flex', justifyContent: 'space-between'}}
            onClick={() => setOpen(true)}
            className={classes.cellButton}
          >
            <Typography>${numberWithCommas(value)}</Typography>
            <CreateIcon style={{marginBottom: 3, marginLeft: 4}} fontSize="small" />
          </MuiButton>
        )
      },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );
  const leaseItColumns = React.useMemo(
    () => [
      { Header: "Driver", accessor: "driver", type: 'select', options: driverOptions },
      { Header: "Make", accessor: "make", type: 'input' },
      { Header: "Model", accessor: "model", type: 'input' },
      { Header: "Year", accessor: "year", type: 'input' },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
      { Header: "Lease Payment", accessor: "payment", type: 'input', inputMask: DollarMask },
      { Header: "Lease End Date", accessor: "endDate", type: 'input' },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );

  React.useEffect(() => {
    setFilteredOwned(data.filter((item) => item.owner !== 'Leasing Company'));
    setFilteredLease(data.filter((item) => item.owner === 'Leasing Company'));
  }, [data]);

  const updateMyData = (rowIndex: number, columnId: number, value: string, tableIndex?: number | undefined | null) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    let prevData = [];
    let newData = [];

    if (tableIndex === 0) {
      prevData = filteredOwned.map((row: VehicleTypes, index: number) => {
        if (index === rowIndex) {
          return { ...filteredOwned[rowIndex], [columnId]: value };
        }
        return row;
      });
      newData = [...prevData, ...filteredLease];
    } else {
      prevData = filteredLease.map((row: VehicleTypes, index: number) => {
        if (index === rowIndex) {
          return { ...filteredLease[rowIndex], [columnId]: value };
        }
        return row;
      });
      newData = [...prevData, ...filteredOwned];
    }

    setData(newData);
  };

  const deleteRowData = (rowIndex: number, tableIndex?: number | undefined | null) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    let prevData = [];
    let newData = [];

    if (tableIndex === 0) {
      prevData = filteredOwned.filter((row: VehicleTypes, index: number) => index !== rowIndex);
      newData = [...prevData, ...filteredLease];
    } else {
      prevData = filteredLease.filter((row: VehicleTypes, index: number) => index !== rowIndex);
      newData = [...prevData, ...filteredOwned];
    }

    setData(newData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSubmit = (values: VehicleTypes) => {
    setData([
      createPrimaryVehicleData(
        values.driver,
        values.owner,
        values.make,
        values.model,
        values.year,
        values.value,
        values.debt,
        values.payment,
        values.endDate
      ),
      ...data,
    ]);
    handleClose();
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'primary-vehicle-popover' : undefined;

  return (
    <DataAccordion
      title="Primary Vehicles You Will Replace at Planned Intervals"
      data={globalData.primaryVehicles}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="primaryVehicles"
      summaryRef={summaryRef}
    >
      <div style={{ width: '30%' }}>
        <Button label="+ Vehicle" onClick={() => setAnchorEl(summaryRef.current)} />
      </div>
      <div style={{ overflowY: 'scroll', position: 'relative'}}>
      { filteredOwned.length !== 0 && (
        <div style={{ border: '1px solid rgba(0, 0, 0, 0.12)', background: 'white', padding: 9, marginTop: 8, paddingBottom: 24 }}>
          <div className="flex flex--justify-sb" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '10px 12px', paddingRight: 6}}>
            <Typography><b>Type:</b> You Own It</Typography>
          </div>
          <EditableTable
            columns={ownItColumns}
            data={filteredOwned}
            setData={setData}
            updateMyData={updateMyData}
            deleteRowData={deleteRowData}
            skipPageReset={skipPageReset}
            tableIndex={0}
          />
        </div>
      )}
      { filteredLease.length !== 0 && (
        <div style={{ border: '1px solid rgba(0, 0, 0, 0.12)', background: 'white', padding: 9, marginTop: 8, paddingBottom: 24 }}>
          <div className="flex flex--justify-sb" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '10px 12px', paddingRight: 6}}>
            <Typography><b>Type:</b> You Lease It</Typography>
          </div>
          <EditableTable
            columns={leaseItColumns}
            data={filteredLease}
            setData={setData}
            updateMyData={updateMyData}
            deleteRowData={deleteRowData}
            skipPageReset={skipPageReset}
            tableIndex={1}
          />
        </div>
      )}
      </div>
      <AddPopover id={id} open={openPop} anchorEl={anchorEl} onClose={handleClose}>
        <Typography variant="h5">Add Primary Vehicle</Typography>
        <Formik
          initialValues={formFields}
          validationSchema={FormSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {/* eslint-disable-next-line no-unused-vars */}
          {({errors, touched, isValid}) => (
            <Form>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Select Driver</Typography>
              <Field name='driver'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <ButtonGroup>
                    {driverOptions.map((option, index) => (
                      <MuiButton
                        key={randomKey()}
                        className={cx(classes.selectButton, { active: option.value === field.value })}
                        onClick={() => {
                          setFieldValue(field.name, option.value);
                        }}
                      >
                        {option.value}
                      </MuiButton>
                    ))}
                  </ButtonGroup>
                )}
              </Field>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Select Owner</Typography>
              <Field name='owner'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <ButtonGroup>
                    {ownerOptions.map((option, index) => (
                      <MuiButton
                        key={randomKey()}
                        className={cx(classes.selectButton, { active: option.value === field.value })}
                        onClick={() => {
                          setFieldValue(field.name, option.value);
                        }}
                      >
                        {option.value}
                      </MuiButton>
                    ))}
                  </ButtonGroup>
                )}
              </Field>
              <div className="flex">
                <div style={{ marginRight: 12 }}>
                  <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Make</Typography>
                  <Field name='make'>
                    {/* @ts-ignore */}
                    {({field, form: { setFieldValue }}) => (
                      <TextField
                        className={classes.input}
                        variant="outlined"
                        label=""
                        onChange={(event: React.ChangeEvent, newValue: string) => {
                          const nextValue = newValue || '';
                          setFieldValue(field.name, nextValue);
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                </div>
                <div style={{ marginRight: 12 }}>
                  <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Model</Typography>
                  <Field name='model'>
                    {/* @ts-ignore */}
                    {({field, form: { setFieldValue }}) => (
                      <TextField
                        className={classes.input}
                        variant="outlined"
                        label=""
                        onChange={(event: React.ChangeEvent, newValue: string) => {
                          const nextValue = newValue || '';
                          setFieldValue(field.name, nextValue);
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                </div>
                <div style={{ width: 100 }}>
                  <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Year</Typography>
                  <Field name='year'>
                    {/* @ts-ignore */}
                    {({field, form: { setFieldValue }}) => (
                      <TextField
                        className={classes.input}
                        variant="outlined"
                        label=""
                        onChange={(event: React.ChangeEvent, newValue: string) => {
                          const nextValue = newValue || '';
                          setFieldValue(field.name, nextValue);
                        }}
                        {...field}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div style={{ marginTop: 24 }} className="flex">
                <div>
                  <div>
                    <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Value</Typography>
                    <Field name='value'>
                      {/* @ts-ignore */}
                      {({field, form: { setFieldValue }}) => (
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          label=""
                          // eslint-disable-next-line
                          InputProps={{ inputComponent: DollarMask as any }}
                          onChange={(event: React.ChangeEvent, newValue: string) => {
                            const nextValue = newValue || '';
                            setFieldValue(field.name, nextValue);
                          }}
                          {...field}
                        />
                      )}
                    </Field>
                    <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Debt</Typography>
                    <Field name='debt'>
                      {/* @ts-ignore */}
                      {({field, form: { setFieldValue }}) => (
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          label=""
                          // eslint-disable-next-line
                          InputProps={{ inputComponent: DollarMask as any }}
                          onChange={(event: React.ChangeEvent, newValue: string) => {
                            const nextValue = newValue || '';
                            setFieldValue(field.name, nextValue);
                          }}
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <Divider style={{marginLeft: 24, marginRight: 24 }} orientation="vertical" flexItem />
                <div style={{ marginBottom: 16 }}>
                  <div>
                    <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Lease Payment</Typography>
                    <Field name='payment'>
                      {/* @ts-ignore */}
                      {({field, form: { setFieldValue }}) => (
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          label=""
                          // eslint-disable-next-line
                          InputProps={{ inputComponent: DollarMask as any }}
                          onChange={(event: React.ChangeEvent, newValue: string) => {
                            const nextValue = newValue || '';
                            setFieldValue(field.name, nextValue);
                          }}
                          {...field}
                        />
                      )}
                    </Field>
                    <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Lease End Date</Typography>
                    <Field name='endDate'>
                      {/* @ts-ignore */}
                      {({field, form: { setFieldValue }}) => (
                        <TextField
                          className={classes.input}
                          variant="outlined"
                          label=""
                          onChange={(event: React.ChangeEvent, newValue: string) => {
                            const nextValue = newValue || '';
                            setFieldValue(field.name, nextValue);
                          }}
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </div>
              </div>
              <div className={classes.formSubmitWrapper}>
                <MuiButton style={{ marginRight: 8 }} onClick={handleClose} color="primary">
                  Cancel
                </MuiButton>
                <MuiButton disabled={!isValid} type="submit" variant="outlined" color="primary">
                  Add
                </MuiButton>
              </div>
            </Form>
          )}
        </Formik>
      </AddPopover>
    </DataAccordion>
  );
}

export default PrimaryVehicles;
