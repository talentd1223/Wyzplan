/* eslint-disable */
import * as React from "react";
import { Redirect } from "react-router-dom";
import { motion } from 'framer-motion';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import useStyles from "../../styles/Dashboard.style";
import {currentUser, directionalRoutes, routeSlideState, assetsDebtEditState} from '../../store/Atoms';
import Typography from '@material-ui/core/Typography';

function KnowYourClient():JSX.Element {
  const classes = useStyles();
  const user = useRecoilValue(currentUser);
  const [slides, setSlides] = useRecoilState(routeSlideState);
  const setDirectionalRoutes = useSetRecoilState(directionalRoutes);
  const position = slides.findIndex((value) => value.route === '/know-your-client');

  React.useEffect(() => {
    let newSlides = [...slides];
    const prevPos = position - 1;
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
  }, []);

  const { animationState } = slides[position];

  return (
    <motion.div
      initial={animationState.initial}
      animate={{ x: 0 }}
      exit={animationState.exit}
      transition={{ duration: 0.5 }}
      className={classes.root}
    >
      { user.id === null ?
        <Redirect to="/users/login" push /> :
        <>
          <Typography variant="h2">Know Your Client</Typography>
          <Typography variant="subtitle1">Placeholder View</Typography>
        </>
      }
    </motion.div>
  );
}

export default KnowYourClient;
