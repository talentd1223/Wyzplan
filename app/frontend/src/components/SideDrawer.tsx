import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import {useRecoilValue} from "recoil";
import useStyles from '../styles/App.styles';
import Nav from "./Nav";
import {navOpen} from "../store/Atoms";

function SideDrawer(): JSX.Element {
  const classes = useStyles();
  const open = useRecoilValue(navOpen);
  const [hovered, setHovered] = React.useState(false);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: hovered ? classes.drawerPaperFull : classes.drawerPaper }}
      onMouseEnter={() =>  setHovered(true)}
      onMouseLeave={() =>  setHovered(false)}
    >
      <Nav />
    </Drawer>
  )
}

export default SideDrawer;
