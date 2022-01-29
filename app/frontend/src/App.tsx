import * as React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router } from "react-router-dom";
import {RecoilRoot} from "recoil";
import Header from './components/Header';
import CustomThemeProvider from "./themes/CustomThemeProvider";
import useStyles from './styles/App.styles';
import SideDrawer from "./components/SideDrawer";
import AppContent from "./AppContent";

function App(): JSX.Element {
  const classes = useStyles();

  return (
    <CustomThemeProvider>
      <CssBaseline />
      <RecoilRoot>
        <Router>
          <Header />
           <SideDrawer />
          <article className={classes.root}>
            <AppContent />
          </article>
        </Router>
      </RecoilRoot>
    </CustomThemeProvider>

  );
}

export default App;
