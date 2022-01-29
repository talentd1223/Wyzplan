/* eslint-disable */
import * as React from "react";
import { motion } from 'framer-motion';
import { Redirect } from "react-router-dom";
import {useRecoilValue} from "recoil";
import {currentUser} from '../../store/Atoms';
import Typography from "@material-ui/core/Typography";
import GlobalRita from "../../components/GlobalData/Rita";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

function Rita():JSX.Element {
  const user = useRecoilValue(currentUser);

  return (
    <motion.div initial="closed" animate="open" exit="closed">
      {user.id === null ?
        <Redirect to="/users/login" push/> :
        <>
          <div
            style={{ marginBottom: 16}}
            className="flex flex--align-center flex--justify-sb"
          >
            <div className="flex flex--align-center">
              <Typography variant="h5">
                RITA
              </Typography>
            </div>
          </div>
          <motion.div variants={variants}>
            <GlobalRita />
          </motion.div>
        </>
      }
    </motion.div>
  );
}

export default Rita;
