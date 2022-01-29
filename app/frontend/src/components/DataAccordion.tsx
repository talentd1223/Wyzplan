/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { motion } from "framer-motion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import {SetterOrUpdater, useRecoilState, useSetRecoilState} from "recoil";
import cx from 'classnames';
import Button from "./Button";
import useStyles from "../styles/Accordion.style";
import { onBoardingCompleted, onBoardScrollHeight } from "../store/Atoms";
import { nFormatter } from '../utils';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

interface GlobalTypes {
  [key: string]: DataTypes
}

interface GlobalExpTypes {
  aboutYou: DataTypes,
  rita: DataTypes,
  netWorth: DataTypes,
  businessYouOwn: DataTypes,
  realEstate: DataTypes,
  homes: DataTypes,
  primaryVehicles: DataTypes,
  personalUseAssets: DataTypes,
  personalDebt: DataTypes,
  employerRetirement: DataTypes,
  brokerages: DataTypes,
  altInvestments: DataTypes,
  specialPortfolio: DataTypes,
  collegeSavings: DataTypes,
  pension: DataTypes,
  deferredCompensation: DataTypes,
  stockPlans: DataTypes,
  lifeInsurance: DataTypes,
  loans: DataTypes,
}

interface DataTypes {
  title: string,
  active: boolean,
  visited: boolean,
  completed: boolean,
  hidden: boolean,
  guide: boolean,
}

interface FinancialSummaryTypes {
  asset: number,
  debt: number,
}

interface AccordionTypes {
  title: string,
  data: DataTypes,
  globals: GlobalTypes,
  setGlobalData: SetterOrUpdater<GlobalExpTypes>,
  dataKey: string,
  children: React.ReactNode,
  // eslint-disable-next-line react/require-default-props
  summaryRef?: React.RefObject<HTMLDivElement> | null,
  // eslint-disable-next-line react/require-default-props
  setAnchorEl?: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>,
  // eslint-disable-next-line react/require-default-props
  financials?: FinancialSummaryTypes,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function DataAccordion({
  title,
  data,
  globals,
  setGlobalData,
  dataKey,
  children,
  summaryRef = null,
  setAnchorEl,
  financials,
}: AccordionTypes): JSX.Element | null {
  const classes = useStyles();
  const dataRef = React.useRef<HTMLDivElement | null>(null);
  const setOnBoardComplete = useSetRecoilState(onBoardingCompleted);
  const [scrollHeight, setScrollHeight] = useRecoilState(onBoardScrollHeight);

  const onNextClick = (event: Event) => {
    event.stopPropagation();

    const keys = Object.keys(globals);
    const activeIndex = keys.indexOf(dataKey);

    // @ts-ignore
    const completed = Object.fromEntries(Object.entries(globals).filter(([key, value]) => value.completed));
    const numCompleted = Object.keys(completed).length;

    // @ts-ignore
    const notHidden = keys.filter((key) => !globals[key].hidden);
    const notHiddenLength = notHidden.length - 1;

    let found = false;
    keys.slice(activeIndex + 1, keys.length).forEach((item) => {
      if (found) return;
      if (!globals[item].hidden) {
        found = true;
        const values = {
          ...globals,
          [dataKey]: {...globals[dataKey], active: false, completed: true},
          [item]: {...globals[item], active: true, visited: true}
        };

        const newValues = {...values};

        notHidden.forEach((key) => {
          if (key !== item) {

            // @ts-ignore
            newValues[key] = {...newValues[key], active: false }
          }
        });

        // @ts-ignore
        setGlobalData(newValues);
        setScrollHeight(scrollHeight + 58);

        setTimeout(() => {
          document.body.scrollTo({
            left: 0,
            top: document.body.scrollHeight,
            behavior: "smooth"
          });
        }, 500);
      }
    });

    if (numCompleted === notHiddenLength) {
      setOnBoardComplete(true);
      const values = {
        ...globals,
        [dataKey]: {...globals[dataKey], active: false, completed: true},
      };

      // @ts-ignore
      setGlobalData(values);
      setTimeout(() => {
        document.body.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth"
        });
      }, 500);
    }
  };

  const onExpandClick = () => {
    const keys = Object.keys(globals).slice(2, Object.keys(globals).length);
    const notHidden = keys.filter((key) => !globals[key].hidden);

    const newValues = { ...globals };
    notHidden.forEach((item) => {

      // @ts-ignore
      newValues[item] = { ...newValues[item], active: false };
    })

    // @ts-ignore
    newValues[dataKey].active = !globals[dataKey].active;

    // @ts-ignore
    setGlobalData(newValues);
  }

  if (!data.visited) return null;

  const handleClick = (event: React.ChangeEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (setAnchorEl && summaryRef ) {
      setAnchorEl(summaryRef.current)
    }
  }

  return(
    <motion.section className="dataWrapper" variants={variants}>
      <Accordion
        ref={dataRef}
        expanded={data.active}
        onChange={() => onExpandClick()}
        className={cx(classes.root, { hidden: data.hidden })}
      >
        <AccordionSummary ref={summaryRef} className={classes.reverseSummary} expandIcon={<ArrowDownwardIcon />}>
          <div className={classes.summaryWrap}>
            <div className={classes.summary}>
              <Typography style={{ paddingLeft: 16 }}>{title}</Typography>
              {setAnchorEl && summaryRef && <Button style={{marginLeft:'1rem'}} label="Add" onClick={handleClick} />}
            </div>
              { financials && <div className={classes.summaryStatWrap}>
              <span style={{ paddingLeft: 16 }}>{nFormatter(financials.asset)}</span>
              <span style={{ paddingLeft: 16 }}>{nFormatter(financials.asset - financials.debt)}</span>
              <span style={{ paddingLeft: 16 }}>{nFormatter(financials.debt)}</span>
            </div>}
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.content}>
            {children}
          </div>
          <div className={classes.guide}>
            <Typography>Guide Placeholder</Typography>
            <div style={{ position: 'absolute', right: 12, bottom: 12,}}>
              { !data.completed && (
                <Button label="Next" onClick={onNextClick} actionable />
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </motion.section>
  );
}

export default DataAccordion;
