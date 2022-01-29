/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import MuiButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import cx from 'classnames';
import { Field, Form, Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import * as Yup from "yup";
import DataAccordion from "../DataAccordion";
import {dialogCellActive, globalDataSections, realEstateDataState} from "../../store/Atoms";
import useStyles from "../../styles/Accordion.style";
import PercentageMask from "../masks/PercentageMask";
import DollarMask from "../masks/DollarMask";
import {createAssetData, numberWithCommas, randomKey} from "../../utils";
import EditableTable from "../EditableTable";
import Button from "../Button";
import AddPopover from "./AddPopover";

const typeOptions = [
  { value: 'Rental', label: 'Rental' },
  { value: 'Land', label: 'Land' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Car', label: 'Car' },
  { value: 'Art', label: 'Art' },
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
  description: '',
  owned: '',
  value: '',
  debt: '',
};

interface CellTypes {
  value: string;
}

interface AssetTypes {
  type: string,
  owner: string,
  description: string,
  owned: string,
  value: string,
  debt: string,
}

function RealEstate(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const setOpen = useSetRecoilState(dialogCellActive);
  const [data, setData] = useRecoilState(realEstateDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const columns = React.useMemo(
    () => [
      { Header: "Description", accessor: "description", type: 'input' },
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "% Owned", accessor: "owned", type: 'input', inputMask: PercentageMask },
      { Header: "Type", accessor: "type", type: 'select', options: typeOptions },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
      {
        Header: "Debt",
        accessor: "debt",
        type: 'input',
        // eslint-disable-next-line react/display-name
        Cell: ({ value }: CellTypes) => (
          <MuiButton
            style={{ display: 'flex', justifyContent: 'space-between' }}
            onClick={() => setOpen(true)}
            className={classes.cellButton}
          >
            <Typography>
              {value && (<>${numberWithCommas(value)}</>)}
            </Typography>
            <CreateIcon style={{marginBottom: 3, marginLeft: 4}} fontSize="small" />
          </MuiButton>
        )
      },
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

  const handleSubmit = (values: AssetTypes) => {
    setData([
      createAssetData(
        values.type,
        values.description,
        values.owner,
        values.owned,
        values.value,
        values.debt,
        '',
        ''
      ),
      ...data,
    ]);
    handleClose();
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'real-estate-popover' : undefined;

  return (
    <DataAccordion
      title="Real Estate & Other Assets Held for Investment"
      data={globalData.realEstate}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="realEstate"
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
        <Typography variant="h5">Add Real Estate & Other Investments Held for Investment</Typography>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Description</Typography>
              <Field name='description'>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>% Owned</Typography>
              <Field name='owned'>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Total Value Before Reduction for Debt</Typography>
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

export default RealEstate;
