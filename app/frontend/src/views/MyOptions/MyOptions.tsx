/* eslint-disable */
import * as React from "react";
import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUser } from '../../store/Atoms';
import Typography from "@material-ui/core/Typography";
import {motion} from "framer-motion";
import AboutYou from "../../components/GlobalData/AboutYou";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

function Personal():JSX.Element {
  const user = useRecoilValue(currentUser);
  return (
    <motion.div initial="closed" animate="open" exit="closed">
      {user.id === null ?
        <Redirect to="/users/login" push/> :
        <>
          <div
            style={{ marginTop: 16, marginBottom: 16}}
            className="flex flex--align-center flex--justify-sb"
          >
            <div className="flex flex--align-center">
              <Typography variant="h5">
                Personal
              </Typography>
            </div>
          </div>
          <motion.div variants={variants}>
            <AboutYou />
          </motion.div>
        </>
      }
    </motion.div>
  );
}

export default Personal;
