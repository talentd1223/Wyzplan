/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {useRecoilState} from "recoil";
import Typography from "@material-ui/core/Typography";
import cx from "classnames";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MuiButton from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DataAccordion from "../DataAccordion";
import {globalDataSections, deferredCompDataState} from "../../store/Atoms";
import useStyles from "../../styles/Accordion.style";
import DollarMask from "../masks/DollarMask";
import {createDeferredCompData, randomKey} from "../../utils";
import Button from "../Button";
import EditableTable from "../EditableTable";
import AddPopover from "./AddPopover";

const ownerOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Joint', label: 'Joint' },
];

const typeOptions = [
  { value: 'Receiving Now', label: 'Receiving Now' },
  { value: 'Future', label: 'Future' },
];

const FormSchema = Yup.object().shape({
  type: Yup.string().required('Please select a Type'),
  owner: Yup.string().required('Please select an Owner'),
});

const formFields = {
  type: '',
  owner: '',
  distributionPeriod: '',
  value: '',
  annualPayment: '',
};

interface CompTypes {
  type: string,
  owner: string,
  distributionPeriod: string,
  value: string,
  annualPayment: string,
}

function DeferredCompensation(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const [data, setData] = useRecoilState(deferredCompDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [filteredFuture, setFilteredFuture] = React.useState<Array<CompTypes>>([]);
  const [filteredReceiving, setFilteredReceiving] = React.useState<Array<CompTypes>>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const futureColumns = React.useMemo(
    () => [
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );
  const receivingColumns = React.useMemo(
    () => [
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
      { Header: "Distribution Period (yrs)", accessor: "distributionPeriod", type: 'input' },
      { Header: "Annual Payment", accessor: "annualPayment", type: 'input', inputMask: DollarMask },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );

  React.useEffect(() => {
    setFilteredFuture(data.filter((item) => item.type === 'Future'));
    setFilteredReceiving(data.filter((item) => item.type === 'Receiving Now'));
  }, [data]);

  const updateMyData = (rowIndex: number, columnId: number, value: string, tableIndex?: number | undefined | null) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    let prevData = [];
    let newData = [];

    if (tableIndex === 0) {
      prevData = filteredFuture.map((row: CompTypes, index: number) => {
        if (index === rowIndex) {
          return { ...filteredFuture[rowIndex], [columnId]: value };
        }
        return row;
      });
      newData = [...prevData, ...filteredReceiving];
    } else {
      prevData = filteredReceiving.map((row: CompTypes, index: number) => {
        if (index === rowIndex) {
          return { ...filteredReceiving[rowIndex], [columnId]: value };
        }
        return row;
      });
      newData = [...prevData, ...filteredFuture];
    }

    setData(newData);
  };

  const deleteRowData = (rowIndex: number, tableIndex?: number | undefined | null) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    let prevData = [];
    let newData = [];

    if (tableIndex === 0) {
      prevData = filteredFuture.filter((row: CompTypes, index: number) => index !== rowIndex);
      newData = [...prevData, ...filteredReceiving];
    } else {
      prevData = filteredReceiving.filter((row: CompTypes, index: number) => index !== rowIndex);
      newData = [...prevData, ...filteredFuture];
    }

    setData(newData);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSubmit = (values: CompTypes) => {
    setData([
      createDeferredCompData(
        values.owner,
        values.type,
        values.value,
        values.distributionPeriod,
        values.annualPayment
      ),
      ...data,
    ]);
    handleClose();
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'def-comp-popover' : undefined;

  return (
    <DataAccordion
      title="Deferred Compensation"
      data={globalData.deferredCompensation}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="deferredCompensation"
      summaryRef={summaryRef}
    >
      <div style={{ width: '30%' }}>
        <Button label="+ Deferred Compensation" onClick={() => setAnchorEl(summaryRef.current)} />
      </div>
      <div style={{ overflowY: 'scroll', position: 'relative'}}>
        { filteredFuture.length !== 0 && (
          <div style={{ border: '1px solid rgba(0, 0, 0, 0.12)', background: 'white', padding: 9, marginTop: 8, paddingBottom: 24 }}>
            <div className="flex flex--justify-sb" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '10px 12px', paddingRight: 6}}>
              <Typography><b>Type:</b> Future</Typography>
            </div>
            <EditableTable
              columns={futureColumns}
              data={filteredFuture}
              setData={setData}
              updateMyData={updateMyData}
              deleteRowData={deleteRowData}
              skipPageReset={skipPageReset}
              tableIndex={0}
            />
          </div>
        )}
        { filteredReceiving.length !== 0 && (
          <div style={{ border: '1px solid rgba(0, 0, 0, 0.12)', background: 'white', padding: 9, marginTop: 8, paddingBottom: 24 }}>
            <div className="flex flex--justify-sb" style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '10px 12px', paddingRight: 6}}>
              <Typography><b>Type:</b> Receiving Now</Typography>
            </div>
            <EditableTable
              columns={receivingColumns}
              data={filteredReceiving}
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
        <Typography variant="h5">Add Deferred Compensation</Typography>
        <Formik
          initialValues={formFields}
          validationSchema={FormSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {/* eslint-disable-next-line no-unused-vars */}
          {({errors, touched, isValid}) => (
            <Form>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Select Type</Typography>
              <Field name='type'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <ButtonGroup>
                    {typeOptions.map((option, index) => (
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Owner</Typography>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Total Value</Typography>
              <Field name='value'>
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
                    // eslint-disable-next-line
                    InputProps={{ inputComponent: DollarMask as any }}
                    {...field}
                  />
                )}
              </Field>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Distribution Period (yrs)</Typography>
              <Field name='distributionPeriod'>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Annual Payment</Typography>
              <Field name='annualPayment'>
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
                    // eslint-disable-next-line
                    InputProps={{ inputComponent: DollarMask as any }}
                    {...field}
                  />
                )}
              </Field>
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

export default DeferredCompensation;
