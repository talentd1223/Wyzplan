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
import {globalDataSections, lifeInsuranceDataState} from "../../store/Atoms";
import useStyles from "../../styles/Accordion.style";
import DollarMask from "../masks/DollarMask";
import {createLifeInsuranceData, randomKey} from "../../utils";
import Button from "../Button";
import EditableTable from "../EditableTable";
import AddPopover from "./AddPopover";

const typeOptions = [
  { value: 'Permanent', label: 'Permanent' },
  { value: 'Universal', label: 'Universal' },
  { value: 'Variable', label: 'Variable' },
  { value: 'Other', label: 'Other' },
];

const ownerOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Joint', label: 'Joint' },
];

const FormSchema = Yup.object().shape({
  type: Yup.string().required('Please select a Type'),
  owner: Yup.string().required('Please select an Owner'),
});

const formFields = {
  type: '',
  owner: '',
  company: '',
  insurance: '',
  premium: '',
  value: '',
};

interface InsuranceTypes {
  type: string,
  owner: string,
  company: string,
  insurance: string,
  premium: string,
  value: string,
}

function LifeInsurance(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const [data, setData] = useRecoilState(lifeInsuranceDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const columns = React.useMemo(
    () => [
      { Header: "Type", accessor: "type", type: 'select', options: typeOptions },
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Company", accessor: "company", type: 'input' },
      { Header: "Insurance", accessor: "insurance", type: 'input', inputMask: DollarMask },
      { Header: "Premium", accessor: "premium", type: 'input', inputMask: DollarMask },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
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

  const handleSubmit = (values: InsuranceTypes) => {
    setData([
      createLifeInsuranceData(
        values.owner,
        values.type,
        values.company,
        values.insurance,
        values.premium,
        values.value
      ),
      ...data,
    ]);
    handleClose();
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'real-estate-popover' : undefined;

  return (
    <DataAccordion
      title="Life Insurance Policies"
      data={globalData.lifeInsurance}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="lifeInsurance"
      summaryRef={summaryRef}
    >
      <div style={{ width: '30%' }}>
        <Button label="+ Real Estate" onClick={() => setAnchorEl(summaryRef.current)} />
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
        <Typography variant="h5">Add Life Insurance</Typography>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Company</Typography>
              <Field name='company'>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Insurance</Typography>
              <Field name='insurance'>
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
                    InputProps={{ inputComponent: DollarMask as any  }}
                    {...field}
                  />
                )}
              </Field>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Premium</Typography>
              <Field name='premium'>
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

export default LifeInsurance;
