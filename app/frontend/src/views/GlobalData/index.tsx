import * as React from 'react';
import {useRecoilValue} from "recoil";
import {motion} from "framer-motion";
import {Redirect} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  currentUser,
  globalDataSections,
  onBoardingCompleted, onBoardScrollHeight,
  staggerTrigger
} from "../../store/Atoms";
import NetWorth from "../../components/GlobalData/NetWorth";
import BusinessYouOwn from "../../components/GlobalData/BusinessYouOwn";
import RealEstate from "../../components/GlobalData/RealEstate";
import Homes from "../../components/GlobalData/Homes";
import PersonalUseAssets from "../../components/GlobalData/PersonalUseAssets";
import PersonalDebt from "../../components/GlobalData/PersonalDebt";
import EmployerRetirement from "../../components/GlobalData/EmployerRetirement";
import Brokerages from "../../components/GlobalData/Brokerages";
import AltInvestments from "../../components/GlobalData/AltInvestments";
import SpecialPortfolio from "../../components/GlobalData/SpecialPortfolio";
import CollegeSavings from "../../components/GlobalData/CollegeSavings";
import Pension from "../../components/GlobalData/Pension";
import DeferredCompensation from "../../components/GlobalData/DeferredCompensation";
import StockPlans from "../../components/GlobalData/StockPlans";
import LifeInsurance from "../../components/GlobalData/LifeInsurance";
import Loans from "../../components/GlobalData/Loans";
import DialogCell from "../../components/DialogCell";
import Button from "../../components/Button";
import useStyles from '../../styles/App.styles';
import PrimaryVehicles from "../../components/GlobalData/PrimaryVehicles";
// import SettingsDrawer from "../../components/GlobalData/SettingsDrawer";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

function GlobalData(): JSX.Element {
  const classes = useStyles();
  const user = useRecoilValue(currentUser);
  const globalData = useRecoilValue(globalDataSections);
  const isComplete = useRecoilValue(onBoardingCompleted);
  const staggerMe = useRecoilValue(staggerTrigger);
  const scrollHeight = useRecoilValue(onBoardScrollHeight);

  const completed = Object.fromEntries(
    Object.entries(globalData).filter(([key, value]) => value.completed)
  );

  const numCompleted = Object.keys(completed).length - 2;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const notHidden = Object.keys(globalData).filter((key) => !globalData[key].hidden).length - 4;

  return (
    <motion.div initial="closed" animate="open" exit="closed">
      {user.id === null ?
        <Redirect to="/users/login" push/> :
        <>
          {/* <SettingsDrawer /> */}
          <div className={classes.globalHeader}>
            <div style={{ width: '100%' }} className="flex flex--align-center flex--justify-sb">
              <div className="flex flex--align-center">
                <Typography variant="h5">
                  Net Worth
                </Typography>
                { !isComplete && (
                  <Typography style={{ marginLeft: 16, fontSize: 16 }} variant="h5">
                    {numCompleted}/{notHidden} complete
                  </Typography>
                )}
              </div>
              <Button label="Guide" onClick={() => console.log('open glide')} actionable />
            </div>
          </div>
          { staggerMe ? null : (
            <motion.div
              style={{
                marginTop: 36,
                marginBottom: 36,
                minHeight: !isComplete ? `calc(100vh + ${scrollHeight}px)` : 'inherit',
              }}
              variants={variants}
            >
              {/* <NetWorth /> */}
              <BusinessYouOwn />
              <RealEstate />
              <Homes />
              <PrimaryVehicles />
              <PersonalUseAssets />
              <PersonalDebt />
              <EmployerRetirement />
              <Brokerages />
              <CollegeSavings />
              <Pension />
              <DeferredCompensation />
              <StockPlans />
              <LifeInsurance />
              <Loans />
              <SpecialPortfolio />
              <AltInvestments />
            </motion.div>
          ) }
          <DialogCell />
        </>
      }
    </motion.div>
  )
}

export default GlobalData;
