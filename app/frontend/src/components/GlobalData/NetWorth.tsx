import * as React from 'react';
import {useRecoilState} from "recoil";
import Typography from "@material-ui/core/Typography";
import DataAccordion from "../DataAccordion";
import {globalDataSections} from "../../store/Atoms";

function NetWorth(): JSX.Element {
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);

  return (
    <DataAccordion
      title="Net Worth -- Asset & Debt Summary"
      data={globalData.netWorth}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="netWorth"
    >
      <Typography style={{
        textAlign: 'center',
        display: 'flex',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        Net Worth -- Asset & Debt Summary Placeholder
      </Typography>
    </DataAccordion>
  );
}

export default NetWorth;
