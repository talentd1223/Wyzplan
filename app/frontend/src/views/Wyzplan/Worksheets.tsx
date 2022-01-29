/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import {Redirect, useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import Typography from "@material-ui/core/Typography";
import {motion} from "framer-motion";
import {businessesDataState, currentUser, plansDataState} from "../../store/Atoms";
import ToolBar from "../../components/worksheets/ToolBar";
import Businesses from "../../components/worksheets/Businesses";
import Button from "../../components/Button";

function Worksheets(): JSX.Element {
  // @ts-ignore
  const { id } = useParams();
  const user = useRecoilValue(currentUser);
  const [plans, setPlans] = useRecoilState(plansDataState);
  const bizData = useRecoilValue(businessesDataState);
  const currentPlan = plans.filter((plan) => plan.id === id)[0];

  React.useEffect(() => {
    if (!currentPlan.worksheet.businesses.length) {
      setPlans((old) =>
        old.map((row, index) => {
          if (row.id === currentPlan.id) {
            return {
              ...old[index],
              worksheet: { ...old[index].worksheet, businesses: [ ...bizData ] }
            };
          }
          return row;
        })
      );
    }
  }, []);

  return (
    <motion.div initial="closed" animate="open" exit="closed">
      { user.id === null ?
        <Redirect to="/users/login" push /> :
        <div>
          <ToolBar />
          <div style={{ marginTop: 12 }} className="flex flex--align-center flex--justify-sb">
            <Typography variant="h6">{currentPlan.name}</Typography>
            <Button label="Guide" disabled onClick={() => console.log('shhh')} />
          </div>
          <Businesses plan={currentPlan} />
        </div>
      }
    </motion.div>
  )
}

export default Worksheets;
