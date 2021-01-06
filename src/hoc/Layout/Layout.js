import React, { useState } from "react";
import { connect } from 'react-redux';

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerCloseHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  }
  


    return (
      <>
        <Toolbar 
          opened= {sideDrawerToggleHandler} 
          isAuth={props.isLogged}
        />
        <SideDrawer 
          isAuth={props.isLogged}
          open={sideDrawerIsVisible} 
          closed={sideDrawerCloseHandler} 
        />
        <main className={classes.Content}>{props.children}</main>
      </>
    );
}

const mapStateToProps = state =>({
  isLogged: state.authReducer.token !== null,
});

export default connect(mapStateToProps)(Layout);
