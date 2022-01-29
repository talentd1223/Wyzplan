/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {useRecoilState} from "recoil";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MuiButton from "@material-ui/core/Button";
import cx from "classnames";
import Grid from '@material-ui/core/Grid';
import DataAccordion from "../DataAccordion";
import {globalDataSections, RetirementDataState} from "../../store/Atoms";
import Button from "../Button";
import {createRetirementData, numberWithCommas, randomKey} from "../../utils";
import useStyles from "../../styles/Accordion.style";
import DollarMask from "../masks/DollarMask";
import EditableTable from "../EditableTable";
import AddPopover from "./AddPopover";

const typeOptions = [
  { value: '401(k)', label: '401(k)' },
  { value: '403(b)', label: '403(b)' },
  { value: 'Money Purchase', label: 'Money Purchase' },
  { value: 'Profit Sharing', label: 'Profit Sharing' },
  { value: 'Other', label: 'Other' },
];

const ownerOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Joint', label: 'Joint' },
];

const FormSchema = Yup.object().shape({
  employer: Yup.string().required('Please enter Employer Name'),
  planType: Yup.string().required('Please select a Type'),
  owner: Yup.string().required('Please select an Owner'),
});

const formFields = {
  planType: '',
  owner: '',
  employer: '',
  roth: '',
  preTax: '',
  afterTax: '',
  loanFromPlan: '',
};

interface TaxTypes {
  roth: string,
  preTax: string,
  afterTax: string,
}

interface RetirementTypes {
  owner: string,
  employer: string,
  planType: string,
  roth: string,
  preTax: string,
  afterTax: string,
  loanFromPlan: string,
}

function EmployerRetirement(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const [data, setData] = useRecoilState(RetirementDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const columns = React.useMemo(
    () => [
      { Header: "Type", accessor: "planType", type: 'select', options: typeOptions },
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Employer", accessor: "employer", type: 'input' },
      { Header: "Roth", accessor: "roth", type: 'input', inputMask: DollarMask },
      { Header: "Pre-Tax", accessor: "preTax", type: 'input', inputMask: DollarMask },
      { Header: "After-Tax", accessor: "afterTax", type: 'input', inputMask: DollarMask },
      // { Header: "Loan From Plan", accessor: "loanFromPlan", type: 'input', inputMask: DollarMask },
      { Header: " ", accessor: "actions", type: 'actions' },
    ],
    []
  );

  const updateMyData = (rowIndex: number, columnId: number, value: string) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return { ...old[rowIndex], [columnId]: value };
        }
        return row;
      })
    );
  };

  const deleteRowData = (rowIndex: number) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      // eslint-disable-next-line array-callback-return,consistent-return
      old.filter((row, index) => index !== rowIndex)
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSubmit = (values: RetirementTypes) => {
    setData([
      createRetirementData(
        values.owner,
        values.employer,
        values.planType,
        values.roth,
        values.preTax,
        values.afterTax,
        ''
      ),
      ...data,
    ]);
    handleClose();
  }

  const renderTaxTotal = (values: TaxTypes) => {
    const roth = parseInt(values.roth || '0', 10);
    const preTax = parseInt(values.preTax || '0', 10);
    const afterTax = parseInt(values.afterTax || '0', 10);

    return numberWithCommas(roth + preTax + afterTax);
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'retirement-popover' : undefined;

  return (
    <DataAccordion
      title="Employer Retirement Plan"
      data={globalData.employerRetirement}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="employerRetirement"
      summaryRef={summaryRef}
    >
      <div style={{ width: '30%' }}>
        <Button label="+ Retirement" onClick={() => setAnchorEl(summaryRef.current)} />
      </div>
      { data.length !== 0 && (
        <EditableTable
          columns={columns}
          data={data}
          setData={setData}
          updateMyData={updateMyData}
          deleteRowData={deleteRowData}
          skipPageReset={skipPageReset}
        />
      )}
      <AddPopover id={id} open={openPop} anchorEl={anchorEl} onClose={handleClose}>
        <Typography variant="h5">Add Retirement Plan</Typography>
        <Formik
          initialValues={formFields}
          validationSchema={FormSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {/* eslint-disable-next-line no-unused-vars */}
          {({errors, touched, isValid, values}) => (
            <Form>
              <div className="flex">
                <div>
                  <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Employer</Typography>
                  <Field name='employer'>
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
                <div style={{ marginLeft: 24 }}>
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
                </div>
              </div>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Select Type</Typography>
              <Field name='planType'>
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
              {/* @ts-ignore */}
              <Grid
                style={{
                  width: '70%',
                  justifyContent: 'space-between',
                  marginTop: 24
                }}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.inputLabel}>Tax Category</Typography>
                </Grid>
                <Grid style={{ width: 100 }} item>
                  <Typography className={classes.inputLabel}>Value</Typography>
                </Grid>
              </Grid>
              {/* @ts-ignore */}
              <Grid
                style={{
                  width: '70%',
                  justifyContent: 'space-between',
                  marginTop: 12
                }}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.inputLabel}>Traditional IRA</Typography>
                  <Typography className={classes.inputLabel}>(Pre-Tax Contributions - taxable withdrawals)</Typography>
                </Grid>
                <Grid item>
                  <Field name='preTax'>
                    {/* @ts-ignore */}
                    {({field, form: { setFieldValue }}) => (
                      <TextField
                        style={{ width: 100 }}
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
                </Grid>
              </Grid>
              {/* @ts-ignore */}
              <Grid
                style={{
                  width: '70%',
                  justifyContent: 'space-between',
                  marginTop: 8
                }}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.inputLabel}>Roth</Typography>
                  <Typography className={classes.inputLabel}>(After-Tax Contributions - tax free withdrawals)</Typography>
                </Grid>
                <Grid item>
                  <Field name='roth'>
                    {/* @ts-ignore */}
                    {({field, form: { setFieldValue }}) => (
                      <TextField
                        style={{ width: 100 }}
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
                </Grid>
              </Grid>
              {/* @ts-ignore */}
              <Grid
                style={{
                  width: '70%',
                  justifyContent: 'space-between',
                  marginTop: 8
                }}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.inputLabel}>After-Tax</Typography>
                  <Typography className={classes.inputLabel}>(taxable withdrawals)</Typography>
                </Grid>
                <Grid item>
                  <Field name='afterTax'>
                    {/* @ts-ignore */}
                    {({field, form: { setFieldValue }}) => (
                      <TextField
                        style={{ width: 100 }}
                        className={classes.input}
                        // eslint-disable-next-line
                        InputProps={{ inputComponent: DollarMask as any }}
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
                </Grid>
              </Grid>
              {/* @ts-ignore */}
              <Grid
                style={{
                  width: '70%',
                  justifyContent: 'space-between',
                  marginTop: 8
                }}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography className={classes.inputLabel}>Total</Typography>
                </Grid>
                <Grid style={{ width: 100 }} item>
                  ${renderTaxTotal(values)}
                </Grid>
              </Grid>
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

export default EmployerRetirement;
