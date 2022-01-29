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
import {globalDataSections, pensionDataState} from "../../store/Atoms";
import useStyles from "../../styles/Accordion.style";
import DollarMask from "../masks/DollarMask";
import PercentageMask from "../masks/PercentageMask";
import Button from "../Button";
import {createPensionData, randomKey} from "../../utils";
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
  benefitBegins: '',
  monthlyAmount: '',
  partnerPortion: '',
  cola: '',
  benefitEnds: '',
  value: '',
};

interface PensionTypes {
  type: string,
  owner: string,
  benefitBegins: string,
  monthlyAmount: string,
  partnerPortion: string,
  cola: string,
  benefitEnds: string,
  value: string,
}

function Pension(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const [data, setData] = useRecoilState(pensionDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const columns = React.useMemo(
    () => [
      { Header: "Type", accessor: "type", type: 'select', options: typeOptions },
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Benefit Begins", accessor: "benefitBegins", type: 'input' },
      { Header: "Amount/mo", accessor: "monthlyAmount", type: 'input', inputMask: DollarMask },
      { Header: "Portion to Partner", accessor: "partnerPortion", type: 'input', inputMask: PercentageMask },
      { Header: "COLA", accessor: "cola", type: 'input' },
      { Header: "Benefit Ends", accessor: "benefitEnds", type: 'input' },
      { Header: "Present Value of Benefit", accessor: "value", type: 'input', inputMask: DollarMask },
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

  const handleSubmit = (values: PensionTypes) => {
    setData([
      createPensionData(
        values.owner,
        values.type,
        values.benefitBegins,
        values.monthlyAmount,
        values.partnerPortion,
        values.cola,
        values.benefitEnds,
        values.value
      ),
      ...data,
    ]);
    handleClose();
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'college-saving-popover' : undefined;

  return (
    <DataAccordion
      title="Pension"
      data={globalData.pension}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="pension"
      summaryRef={summaryRef}
    >
      <div style={{ width: '30%' }}>
        <Button label="+ Pension" onClick={() => setAnchorEl(summaryRef.current)} />
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
        <Typography variant="h5">Add Pension</Typography>
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
              <div className="flex">
                <div>
                  <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Benefits Begins</Typography>
                  <Field name='benefitBegins'>
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
                  <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Benefit Ends</Typography>
                  <Field name='benefitEnds'>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Monthly Amount</Typography>
              <Field name='monthlyAmount'>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Partner Portion</Typography>
              <Field name='partnerPortion'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    style={{ maxWidth: 75 }}
                    label=""
                    onChange={(event: React.ChangeEvent, newValue: string) => {
                      const nextValue = newValue || '';
                      setFieldValue(field.name, nextValue);
                    }}
                    // eslint-disable-next-line
                    InputProps={{ inputComponent: PercentageMask as any }}
                    {...field}
                  />
                )}
              </Field>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>COLA</Typography>
              <Field name='cola'>
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
                    InputProps={{ inputComponent: DollarMask as any  }}
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

export default Pension;
