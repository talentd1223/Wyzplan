import * as React from 'react';
import {useRecoilState} from "recoil";
import Typography from "@material-ui/core/Typography";
import DataAccordion from "../DataAccordion";
import {globalDataSections} from "../../store/Atoms";

function Rita(): JSX.Element {
  const [globalData, setGlobalData] = useRecoilState(globalDataSections);

  return (
    <DataAccordion
      title="RITA"
      data={globalData.rita}
      globals={globalData}
      setGlobalData={setGlobalData}
      dataKey="rita"
    >
      <Typography style={{
        textAlign: 'center',
        display: 'flex',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        RITA Data Section
      </Typography>
    </DataAccordion>
  );
}

export default Rita;
