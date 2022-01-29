import * as React from 'react';
import {useRecoilState} from "recoil";
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {globalDataSections} from "../../store/Atoms";
import DataAccordion from "../DataAccordion";

interface CheckboxProps {
  name: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  checked: boolean,
  label: string,
}

function AboutYou(): JSX.Element {
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const newData = {
      ...globalData,
      [key]: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ...globalData[key],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        hidden: !globalData[key].hidden,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        visited: !!globalData[key].hidden
      }
    }

    setGlobalData(newData);
  };

  const CheckboxWrapper = ({ name, onChange, checked, label }: CheckboxProps): JSX.Element => (
    <FormControlLabel
      control={
        <Checkbox onChange={onChange} name={name} checked={checked} color="default"/>
      }
      label={label}
    />
  );

  return (
    <DataAccordion
      title="About You"
      data={globalData.aboutYou}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="aboutYou"
    >
      <Typography style={{ marginBottom: 12 }}>Select all that apply:</Typography>
      <Grid container spacing={1}>
        <Grid item spacing={3}>
          <FormGroup>
            <CheckboxWrapper
              name='businessYouOwn'
              onChange={handleChange}
              checked={!globalData.businessYouOwn.hidden}
              label="Business You Own"
            />
            <CheckboxWrapper
              name='realEstate'
              onChange={handleChange}
              checked={!globalData.realEstate.hidden}
              label="Real Estate"
            />
            <CheckboxWrapper
              name='pension'
              onChange={handleChange}
              checked={!globalData.pension.hidden}
              label="Pension"
            />
          </FormGroup>
        </Grid>
        <Grid item spacing={3}>
          <FormGroup>
            <CheckboxWrapper
              name='deferredCompensation'
              onChange={handleChange}
              checked={!globalData.deferredCompensation.hidden}
              label="Deferred Compensation"
            />
            <CheckboxWrapper
              name='stockPlans'
              onChange={handleChange}
              checked={!globalData.stockPlans.hidden}
              label="Stock Plans"
            />
            <CheckboxWrapper
              name='lifeInsurance'
              onChange={handleChange}
              checked={!globalData.lifeInsurance.hidden}
              label="Cash Value Life Insurance"
            />
          </FormGroup>
        </Grid>
        <Grid item spacing={3}>
          <FormGroup>
            <CheckboxWrapper
              name='loans'
              onChange={handleChange}
              checked={!globalData.loans.hidden}
              label="Loan(s) Owed to You"
            />
            <CheckboxWrapper
              name='collegeSavings'
              onChange={handleChange}
              checked={!globalData.collegeSavings.hidden}
              label="College Savings Plans"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </DataAccordion>
  );
}

export default AboutYou;
