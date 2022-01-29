/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import cx from 'classnames';
import Divider from "@material-ui/core/Divider";
import {useSetRecoilState} from "recoil";
import useStyles from "../../styles/Accordion.style";
import Button from "../Button";
import {randomKey} from "../../utils";
import GlobalCard from "./GlobalCard";
import GrowthRate from "./GrowthRate";
import AddGoals from "./AddGoals";
import {addGoalsDialogOpen} from "../../store/Atoms";
import EmploymentDialog from "./goals/EmploymentDialog";
import EmploymentCard from "./goals/EmploymentCard";
import RetirementDialog from "./goals/RetirementDialog";
import ProfitDialog from "./goals/ProfitDialog";
import ProfitCard from "./goals/ProfitCard";
import RetirementCard from "./goals/RetirementCard";
import SellSharesDialog from "./goals/SellSharesDialog";
import BuySharesDialog from "./goals/BuySharesDialog";

interface BusinessProps {
  plan: PlanTypes
}

function Businesses({ plan }: BusinessProps): JSX.Element {
  const classes = useStyles();
  const dataRef = React.useRef(null);
  const summaryRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState(false);
  const businesses = [ ...plan.worksheet.businesses ];
  const [activeBiz, setActiveBiz] = React.useState<Array<string>>([]);
  const [active, setActive] = React.useState<BusinessRowProps | null>(null);
  const setOpen = useSetRecoilState(addGoalsDialogOpen);

  const onBizClick = (event: React.ChangeEvent, item: string) => {
    event.stopPropagation();
    event.preventDefault();

    if (activeBiz.includes(item)) {
      const newBiz = activeBiz.filter(biz => item !== biz);
      setActiveBiz(newBiz);
    } else {
      setActiveBiz([...activeBiz, item]);
    }
  }

  const filteredBiz = businesses.filter((biz) => activeBiz.includes(biz.name));

  return (
    <div style={{ position: 'relative', marginTop: 12 }}>
      <Accordion
        ref={dataRef}
        expanded={expanded || activeBiz.length !== 0}
        onChange={() => setExpanded(!expanded)}
        className={classes.root}
      >
        <AccordionSummary ref={summaryRef} className={classes.reverseSummary} expandIcon={<ArrowDownwardIcon />}>
          <div className={classes.summary} style={{ justifyContent: 'space-between' }}>
            <div className="flex flex--align-center">
              <Typography style={{ paddingLeft: 16, marginRight: 16 }}>Goals for Business</Typography>
              { businesses.map((biz, index) => (
                <Button
                  style={{ marginRight: 12 }}
                  key={randomKey()}
                  label={biz.name}
                  active={activeBiz.includes(biz.name)}
                  onClick={(e: React.ChangeEvent) => onBizClick(e, biz.name)}
                />
              ))}
            </div>
            <Button label="Add Future Business" disabled onClick={() => console.log('shhh')} />
          </div>
        </AccordionSummary>
        <AccordionDetails className={cx(classes.details, "white")}>
          { filteredBiz.map((biz, index) => (
            <>
              <section style={{ padding: 16 }} key={randomKey()}>
                <div className="flex flex--align-center">
                  <Typography style={{ marginRight: 12 }}><b>{biz.name}</b></Typography>
                  <Button label="Add Goals" onClick={() => {
                    setActive(biz);
                    setOpen(true);
                  }} />
                </div>
                <div style={{ marginTop: 12 }} className="flex">
                  <GlobalCard />
                  <GrowthRate />
                </div>
                <div style={{ marginTop: 12 }} className="flex">
                  <EmploymentCard />
                  <ProfitCard />
                  <RetirementCard />
                </div>
              </section>
              { (index !== filteredBiz.length - 1) && <Divider /> }
            </>
          ))}
        </AccordionDetails>
      </Accordion>
      <AddGoals business={active} />
      <EmploymentDialog business={active} setBusiness={setActive} />
      <RetirementDialog business={active} setBusiness={setActive} />
      <ProfitDialog business={active} setBusiness={setActive} />
      <SellSharesDialog business={active} setBusiness={setActive} />
      <BuySharesDialog business={active} setBusiness={setActive} />
    </div>
  )
}

export default Businesses;
