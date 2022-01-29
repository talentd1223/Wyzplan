/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import MuiButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import cx from "classnames";
import TextField from "@material-ui/core/TextField";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DataAccordion from "../DataAccordion";
import {dialogCellActive, globalDataSections, HomesDataState} from "../../store/Atoms";
import useStyles from "../../styles/Accordion.style";
import DollarMask from "../masks/DollarMask";
import {createHomesData, numberWithCommas, randomKey} from "../../utils";
import Button from "../Button";
import EditableTable from "../EditableTable";
import AddPopover from "./AddPopover";

const ownerOptions = [
  { value: 'John', label: 'John' },
  { value: 'Anne', label: 'Anne' },
  { value: 'Joint', label: 'Joint' },
];

const useOptions = [
  { value: 'Legal Residence', label: 'Legal Residence' },
  { value: 'Part-Time Residence', label: 'Part-Time Residence' },
];

const FormSchema = Yup.object().shape({
  location: Yup.string().required('Please Enter a Location'),
  owner: Yup.string().required('Please select an Owner'),
  use: Yup.string().required('Please select a Use Type'),
});

const formFields = {
  location: '',
  owner: '',
  use: '',
  value: '',
  debt: '',
};

interface HomeTypes {
  location: string,
  owner: string,
  use: string,
  value: string,
  debt: string,
}

interface CellTypes {
  value: string,
}

function Homes(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const setOpen = useSetRecoilState(dialogCellActive);
  const [data, setData] = useRecoilState(HomesDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const columns = React.useMemo(
    () => [
      { Header: "Location", accessor: "location", type: 'input' },
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Use", accessor: "use", type: 'select', options: useOptions },
      { Header: "Value", accessor: "value", type: 'input', inputMask: DollarMask },
      {
        Header: "Debt",
        accessor: "debt",
        type: 'input',
        // eslint-disable-next-line react/display-name
        Cell: ({ value }: CellTypes) => (
          <MuiButton
            style={{ display: 'flex', justifyContent: 'space-between'  }}
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

  const handleSubmit = (values: HomeTypes) => {
    setData([
      createHomesData(
        values.owner,
        values.location,
        values.use,
        values.value,
        values.debt,
        '',
        '',
      ),
      ...data,
    ]);
    handleClose();
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'homes-popover' : undefined;

  return (
    <DataAccordion
      title="Home(s) You Own to Live In"
      data={globalData.homes}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="homes"
      summaryRef={summaryRef}
    >
      <div style={{ width: '30%' }}>
        <Button label="+ Home" onClick={() => setAnchorEl(summaryRef.current)} />
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
        <Typography variant="h5">Add Home</Typography>
        <Formik
          initialValues={formFields}
          validationSchema={FormSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {/* eslint-disable-next-line no-unused-vars */}
          {({errors, touched, isValid}) => (
            <Form>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Location</Typography>
              <Field name='location'>
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Use of Home</Typography>
              <Field name='use'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <ButtonGroup>
                    {useOptions.map((option, index) => (
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

export default Homes;
