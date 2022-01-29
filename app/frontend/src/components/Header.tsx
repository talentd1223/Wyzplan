import * as React from "react";
import { useHistory } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AppBar from "@material-ui/core/AppBar";
import {useRecoilValue} from "recoil";
import Typography from "@material-ui/core/Typography";
import Avatar from '../assets/images/Avatar.svg';
import useStyles from '../styles/App.styles';
import {userAuthorized} from "../store/Atoms";

type AnchorType =
  | Element
  | ((element: Element) => Element)
  | undefined
  | null;

function Header(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const isAuth = useRecoilValue(userAuthorized);
  const [anchorEl, setAnchorEl] = React.useState<AnchorType>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    history.push("/users/logout");
    setAnchorEl(null);
  };

  const handleSignIn = () => {
    history.push("/users/login");
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 40,
      }}>
        <Typography style={{ color: "black", fontWeight: 500 }}>
          Wyzplan Prototype
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
            color="inherit"
            edge="end"
            style={{padding: 6}}
          >
            <img src={Avatar} alt="test" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            { isAuth ? (
              <>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleSignIn}>Sign In</MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
