/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {useRecoilState} from "recoil";
import MuiButton from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import cx from 'classnames';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DataAccordion from "../DataAccordion";
import {businessesDataState, globalDataSections} from "../../store/Atoms";
import DollarMask from "../masks/DollarMask";
import PercentageMask from "../masks/PercentageMask";
import useStyles from "../../styles/Accordion.style";
import {createBusinessData, randomKey, nFormatter} from "../../utils";
import AddPopover from "./AddPopover";

const legalOptions = [
  { value: 'Sole Proprietor', label: 'Sole Proprietor' },
  { value: 'LLC', label: 'LLC' },
  { value: 'General Partnership', label: 'General Partnership' },
  { value: 'S Corp', label: 'S Corp' },
  { value: 'C Corp', label: 'C Corp' },
];

const ownerOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Joint', label: 'Joint' },
];

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a Business Name'),
});

const formFields = {
  name: '',
  legal: '',
  value: '',
  owner: '',
  ownership: '',
  debt: '',
  goals: []
};

interface BusinessTypes {
  name: string,
  legal: string,
  value: string,
  owner: string,
  ownership: string,
  debt: string,
  goals: Array<BusinessGoalTypes>,
}

function BusinessYouOwn(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const [data, setData] = useRecoilState(businessesDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSubmit = (values: BusinessTypes) => {
    setData([
      createBusinessData(
        values.name,
        values.legal,
        values.value,
        values.owner,
        values.ownership,
        values.debt,
        []
      ),
      ...data,
    ]);
    handleClose();
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'business-popover' : undefined;

  interface FinancialSummaryTypes {
    asset: number,
    debt: number,
  }

  const financials: FinancialSummaryTypes = {
    asset: (data.reduce((s, biz) => s + parseInt(biz.value, 10), 0)),
    debt: (data.reduce((s, biz) => s + parseInt(biz.debt, 10), 0))
  }

  return (
    <DataAccordion
      title="Businesses You Own"
      data={globalData.businessYouOwn}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="businessYouOwn"
      summaryRef={summaryRef}
      setAnchorEl={setAnchorEl}
      financials={financials}
    >
      { data.length !== 0 && (
        <Grid container spacing={2}>
          {data.map((biz: BusinessTypes) => 
            <Grid item xs={12} md={4} key={biz.name}>
              <Card>
                <CardContent>
                  <h3 className={classes.bizCardTitle}>{biz.name}</h3>
                  <p style={{marginBottom:'0.5rem'}}>Owner: {biz.owner}</p>
                  <p style={{marginBottom:'0.5rem'}}>Value: {nFormatter(Number(biz.value))}</p>
                  <p style={{margin:0}}>Debt: {nFormatter(Number(biz.debt))}</p>
                </CardContent>
                <div/>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
      <AddPopover id={id} open={openPop} anchorEl={anchorEl} onClose={handleClose}>
        <Typography variant="h5">Add New Business</Typography>
        <Formik
          initialValues={formFields}
          validationSchema={FormSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {/* eslint-disable-next-line no-unused-vars */}
          {({errors, touched, isValid}) => (
            <Form>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Business Name</Typography>
              <Field name='name'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    label=""
                    autoFocus
                    onChange={(event: React.ChangeEvent, newValue: string) => {
                      const nextValue = newValue || '';
                      setFieldValue('name', nextValue);
                    }}
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name ? errors.name : null}
                    {...field}
                  />
                )}
              </Field>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Legal Type</Typography>
              <Field name='legal'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <ButtonGroup>
                    {legalOptions.map((option, index) => (
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>% Owned</Typography>
              <Field name='ownership'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <TextField
                    className={classes.input}
                    style={{ maxWidth: 75 }}
                    variant="outlined"
                    label=""
                    onChange={(event: React.ChangeEvent, newValue: string) => {
                      const nextValue = newValue || '';
                      setFieldValue(field.name, nextValue);
                    }}
                    // eslint-disable-next-line
                    InputProps={{ inputComponent: PercentageMask as any  }}
                    {...field}
                  />
                )}
              </Field>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Total Market Value Before Reduction for Debt</Typography>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Total Debt</Typography>
              <Field name='debt'>
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

export default BusinessYouOwn;
