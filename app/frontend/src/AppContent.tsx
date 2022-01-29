import * as React from "react";
import cx from 'classnames';
import {useRecoilValue} from "recoil";
import AppRoutes from "./AppRoutes";
import useStyles from './styles/App.styles';
import {navOpen} from "./store/Atoms";

function AppContent(): JSX.Element {
  const classes = useStyles();
  const open = useRecoilValue(navOpen);

  return (
    <main className={cx(classes.content, { [classes.contentShift]: open })}>
      <AppRoutes />
    </main>
  );
}

export default AppContent;
