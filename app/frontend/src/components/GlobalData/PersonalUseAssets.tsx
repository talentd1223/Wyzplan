/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import Typography from "@material-ui/core/Typography";
import cx from "classnames";
import MuiButton from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import DataAccordion from "../DataAccordion";
import {dialogCellActive, globalDataSections, PersonalAssetsDataState} from "../../store/Atoms";
import Button from "../Button";
import {createPersonalAssetData, numberWithCommas, randomKey} from "../../utils";
import useStyles from "../../styles/Accordion.style";
import DollarMask from "../masks/DollarMask";
import EditableTable from "../EditableTable";
import AddPopover from "./AddPopover";

const itemOptions = [
  { value: 'Watercraft', label: 'Watercraft' },
  { value: 'RV', label: 'RV' },
  { value: 'Aircraft', label: 'Aircraft' },
  { value: 'Vehicle - Non-Primary', label: 'Vehicle - Non-Primary' },
  { value: 'Membership', label: 'Membership' },
  { value: 'Horses', label: 'Horses' },
  { value: 'Other', label: 'Other' },
];

const collectionsOptions = [
  { value: 'Art', label: 'Art' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Antiques', label: 'Antiques' },
  { value: 'Watches', label: 'Watches' },
  { value: 'Coins', label: 'Coins' },
  { value: 'Clothing', label: 'Clothing' },
  // { value: 'Other', label: 'Other' },
  { value: 'Stamps', label: 'Stamps' },
  { value: 'Cards', label: 'Cards' },
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
  marketValue: '',
  debt: '',
};

interface AssetTypes {
  type: string,
  owner: string,
  description: string,
  marketValue: string,
  debt: string,
}

type CellType = {
  value: string;
}

function PersonalUseAssets(): JSX.Element {
  const classes = useStyles();
  const summaryRef = React.useRef(null);
  const setOpen = useSetRecoilState(dialogCellActive);
  const [data, setData] = useRecoilState(PersonalAssetsDataState);
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const columns = React.useMemo(
    () => [
      { Header: "Description", accessor: "description", type: 'input' },
      { Header: "Owner", accessor: "owner", type: 'select', options: ownerOptions },
      { Header: "Type", accessor: "type", type: 'select', options: [...itemOptions, ...collectionsOptions] },
      { Header: "Value", accessor: "marketValue", type: 'input', inputMask: DollarMask },
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
      createPersonalAssetData(
        values.owner,
        values.type,
        values.description,
        values.marketValue,
        values.debt
      ),
      ...data,
    ]);
    handleClose();
  }

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'personal-assets-popover' : undefined;

  return (
    <DataAccordion
      title="Other Personal Use Assets that Have Market Value"
      data={globalData.personalUseAssets}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="personalUseAssets"
      summaryRef={summaryRef}
    >
      <div style={{ width: '30%' }}>
        <Button label="+ Asset" onClick={() => setAnchorEl(summaryRef.current)} />
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
        <Typography variant="h5">Add Personal Use Assets</Typography>
        <Formik
          initialValues={formFields}
          validationSchema={FormSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {/* eslint-disable-next-line no-unused-vars */}
          {({errors, touched, isValid}) => (
            <Form>
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Select Type of Item or Collection</Typography>
              <Field name='type'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <ButtonGroup>
                    {itemOptions.map((option, index) => (
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Collection</Typography>
              <Field name='type'>
                {/* @ts-ignore */}
                {({field, form: { setFieldValue }}) => (
                  <ButtonGroup>
                    {collectionsOptions.map((option, index) => (
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
              <Typography style={{ marginTop: 12 }} className={classes.inputLabel}>Total Value Before Reduction for Debt</Typography>
              <Field name='marketValue'>
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

export default PersonalUseAssets;
