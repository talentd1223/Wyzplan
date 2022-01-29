import * as React from "react";
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import useStyles from '../styles/Nav.style';
import {currentUser, userAuthorized} from '../store/Atoms';
import logo from '../assets/images/placeholder.svg';

function Nav(): JSX.Element {
  const classes = useStyles();
  const user = useRecoilValue(currentUser);
  const isAuth = useRecoilValue(userAuthorized);

  return (
    <div className={classes.root}>
      <List disablePadding component="nav" aria-label="navigation">
        { (isAuth && user.id !== null) ?
          <>
            <ListItem className={classes.listItem} button component={Link} to="/">
              <ListItemAvatar>
                <Avatar alt='Avatar' src={logo} />
              </ListItemAvatar>
              <ListItemText primary="Dashboard" secondary="My Home Page" />
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem} button component={Link} to="/personal">
              <ListItemAvatar>
                <Avatar alt='Avatar' src={logo} />
              </ListItemAvatar>
              <ListItemText primary="Personal" secondary="Personal & General Info" />
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem} button component={Link} to="/net-worth">
              <ListItemAvatar>
                <Avatar alt='Avatar' src={logo} />
              </ListItemAvatar>
              <ListItemText primary="Net Worth" secondary="Add and Update Your Data" />
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem} button component={Link} to="/know-your-client">
              <ListItemAvatar>
                <Avatar alt='Avatar' src={logo} />
              </ListItemAvatar>
              <ListItemText primary="Know Your Client" secondary="Get to know your client" />
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem} button component={Link} to="/rita">
              <ListItemAvatar>
                <Avatar alt='Avatar' src={logo} />
              </ListItemAvatar>
              <ListItemText primary="RITA" secondary="Return, Inflation, Taxes" />
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem} button component={Link} to="/wyzplan">
              <ListItemAvatar>
                <Avatar alt='Avatar' src={logo} />
              </ListItemAvatar>
              <ListItemText primary="Wyzplans" secondary="Create and Edit" />
            </ListItem>
            <Divider />
          </> :
          <>
            <ListItem className={classes.listItem}  button component={Link} to="/users/login">
              <ListItemAvatar>
                <Avatar alt='Avatar' src={logo} />
              </ListItemAvatar>
              <ListItemText primary="Sign In" />
            </ListItem>
          </>
        }
      </List>
    </div>
  );
}

export default Nav;
