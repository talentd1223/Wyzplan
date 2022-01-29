import * as React from "react";
import { motion } from 'framer-motion';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import Divider from '@material-ui/core/Divider';
import {currentUser, directionalRoutes, routeSlideState} from '../../store/Atoms';
import DashCard from "../../components/DashCard";

function Dashboard():JSX.Element {

  const user = useRecoilValue(currentUser);
  const [slides, setSlides] = useRecoilState(routeSlideState);
  const setDirectionalRoutes = useSetRecoilState(directionalRoutes);
  const position = slides.findIndex((value) => value.route === '/');

  React.useEffect(() => {
    const newSlides = [...slides];
    const prevPos = slides.length - 1;
    const nextPos = position + 1;

    newSlides[prevPos] = { ...newSlides[prevPos], animationState: {
        ...newSlides[prevPos].animationState,
        initial: { x: "-115%" },
      }
    }

    newSlides[nextPos] = { ...newSlides[nextPos], animationState: {
        ...newSlides[nextPos].animationState,
        initial: { x: "115%" },
      }
    }

    setDirectionalRoutes([newSlides[prevPos], newSlides[nextPos]]);
    setSlides(newSlides);
    // eslint-disable-next-line
  }, []);

  const { animationState } = slides[position];

  return (
    <motion.div
      initial={animationState.initial}
      animate={{ x: 0 }}
      exit={animationState.exit}
      transition={{ duration: 0.5 }}
    >
      { user.id === null ?
          <Redirect to="/users/login" push /> :
          <>
            <Typography variant="h5">Personal Information & Wyzplans</Typography>
            <section className="flex flex--wrap" style={{ marginTop: 12 }}>
              <DashCard title="Personal" label="Last Updated: 12/31/21" route="/personal" />
              <DashCard title="Know Your Client" label="Last Updated: 12/31/21" route="/know-your-client" />
              <DashCard title="RITA" label="Last Updated: 12/31/21" route="/rita" />
              <DashCard title="Net Worth" label="Last Updated: 12/31/21" route="/net-worth" />
              <DashCard title="Plan" label="Last Updated: 12/31/21" route="/wyzplan" />
            </section>
            <Divider style={{ marginTop: 40, marginBottom: 40 }} />
            <Typography variant="h5">Summary Tools</Typography>
            <section className="flex flex--wrap" style={{ marginTop: 12 }}>
              <DashCard title="What if?" label="Last Updated: 12/31/21" route="/" />
              <DashCard title="Your Story" label="Last Updated: 12/31/21" route="/" />
            </section>
            <Divider style={{ marginTop: 40, marginBottom: 40 }} />
            <Typography variant="h5">Resources</Typography>
            <section className="flex flex--wrap" style={{ marginTop: 12 }}>
              <DashCard title="Connect" label="Last Updated: 12/31/21" route="/" />
              <DashCard title="Hire a Coach" label="Last Updated: 12/31/21" route="/" />
            </section>
          </>
      }
    </motion.div>
  );
}

export default Dashboard;
