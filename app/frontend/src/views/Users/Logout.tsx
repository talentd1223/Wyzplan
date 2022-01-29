import * as React from "react";
import { useSetRecoilState } from "recoil";
import { Redirect } from "react-router-dom";
import {currentUser, userAuthorized} from "../../store/Atoms";

function Logout():JSX.Element {
  const setUser = useSetRecoilState(currentUser);
  const setAuth = useSetRecoilState(userAuthorized);

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  setUser({ id: null, email: '', first_name: '', last_name: '' });
  setAuth(false);

  return (
    <Redirect to="/users/login" push />
  );
}

export default Logout;
