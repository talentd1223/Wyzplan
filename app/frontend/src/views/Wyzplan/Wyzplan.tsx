/* eslint-disable */
import * as React from "react";
import { motion } from 'framer-motion';
import {Redirect, useHistory } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {businessesDataState, currentUser, plansDataState} from '../../store/Atoms';
import Typography from "@material-ui/core/Typography";
import DashCard from "../../components/DashCard";
import Divider from '@material-ui/core/Divider';
import Button from "../../components/Button";
import {createPlanData, createWorksheetData} from "../../utils";

function Wyzplan():JSX.Element {
  const history = useHistory();
  const user = useRecoilValue(currentUser);
  const [plans, setPlans] = useRecoilState(plansDataState);
  const bizData = useRecoilValue(businessesDataState);

  const onNewPlanClick = () => {
    const pos = plans.length + 1;
    history.push(`/wyzplan/plan-${pos}`);
    setPlans([...plans, createPlanData(
      `plan-${pos}`,
      `Plan ${pos}`,
      '2021-11-17',
      '2021-11-17',
      createWorksheetData(
        'worksheet-1',
        'Worksheet 1',
        '2021-11-17',
        '2021-11-17',
        [...bizData]
      )
    )])
  }

  return (
    <motion.div initial="closed" animate="open" exit="closed">
      { user.id === null ?
          <Redirect to="/users/login" push /> :
          <div>
            <Typography style={{ marginBottom: 12 }} variant="h6">Plans</Typography>
            <Button label="Add A New Plan" onClick={onNewPlanClick} />
            <Button label="Compare Plans" disabled style={{ marginLeft: 12 }} />
            <Divider style={{ marginTop: 12 }} />
            <div className="flex" style={{ marginTop: 12 }}>
              { plans.length ? plans.map((plan) => (
                <DashCard
                  title={plan.name}
                  label={`Updated at: ${plan.updated}`}
                  route={`/wyzplan/${plan.id}`}
                />
              )) : (
                <div>No Plans...</div>
              )}
            </div>
          </div>
      }
    </motion.div>
  );
}

export default Wyzplan;
