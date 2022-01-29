import * as React from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import {useSetRecoilState, useRecoilValue, useRecoilState} from "recoil";
import Dashboard from "./views/Dashboard/Dashboard";
import LoginForm from "./views/Users/LoginForm";
import Logout from "./views/Users/Logout";
import Rita from "./views/Rita/Rita";
import Wyzplan from "./views/Wyzplan/Wyzplan";
import Worksheets from './views/Wyzplan/Worksheets';
import Personal from "./views/MyOptions/MyOptions";
import GlobalData from "./views/GlobalData";
import {currentUser, userAuthorized} from "./store/Atoms";
import axiosInstance from "./utils/axiosApi";
import KnowYourClient from "./views/KnowYourClient/KnowYourClient";

function AppRoutes(): JSX.Element {
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);

  const InitializeAuth = () => {
    const [isAuth, setAuth] = useRecoilState(userAuthorized);
    const setUser = useSetRecoilState(currentUser);

    const checkAuth = async () => {
      if (isAuth) return;
      try {
        const res = await axiosInstance.get(`/users/current_user?timestamp=${new Date().getTime()}`);
        if (res) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setUser(res);
          setAuth(true);
        }
        else {
          setUser({ id:null, email:'', first_name:'', last_name:'' });
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
      }
      setLoading(false);
    }

    // eslint-disable-next-line
    React.useEffect(() => { checkAuth() }, []);

    return null;
  }

  const LandingWrapper = () => {
    const isAuth = useRecoilValue(userAuthorized);
    return (
      <>
        {/* eslint-disable-next-line no-nested-ternary */}
        { (isAuth) ? (
          <Dashboard />
        ) : !loading && <Redirect to="/users/login" push />}
      </>
    )
  }

  const NetWorthWrapper = () => {
    const isAuth = useRecoilValue(userAuthorized);
    return (
      <>
        {/* eslint-disable-next-line no-nested-ternary */}
        { (isAuth) ? (
          <GlobalData />
        ) : !loading && <Redirect to="/users/login" push />}
      </>
    )
  }

  const PlanWrapper = () => {
    const isAuth = useRecoilValue(userAuthorized);
    return (
      <>
        {/* eslint-disable-next-line no-nested-ternary */}
        { (isAuth) ? (
          <Wyzplan />
        ) : !loading && <Redirect to="/users/login" push />}
      </>
    )
  }

  const WorksheetWrapper = () => {
    const isAuth = useRecoilValue(userAuthorized);
    return (
      <>
        {/* eslint-disable-next-line no-nested-ternary */}
        { (isAuth) ? (
          <Worksheets />
        ) : !loading && <Redirect to="/users/login" push />}
      </>
    )
  }

  return (
    <>
      <InitializeAuth />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <LandingWrapper />
          </Route>
          <Route exact path="/rita">
            <Rita />
          </Route>
          <Route exact path="/wyzplan">
            <PlanWrapper />
          </Route>
          <Route exact path="/wyzplan/:id">
            <WorksheetWrapper />
          </Route>
          <Route exact path="/personal">
            <Personal />
          </Route>
          <Route exact path="/know-your-client">
            <KnowYourClient />
          </Route>
          <Route exact path="/net-worth">
            <NetWorthWrapper />
          </Route>
          <Route exact path="/users/login">
            <LoginForm />
          </Route>
          <Route exact path="/users/logout">
            <Logout />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  )
}

export default AppRoutes;
