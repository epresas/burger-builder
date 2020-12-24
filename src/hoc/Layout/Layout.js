import React, { Component } from "react";
import { connect } from 'react-redux';

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

export class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  }
  

  render() {
    return (
      <>
        <Toolbar 
          opened= {this.sideDrawerToggleHandler} 
          isAuth={this.props.isLogged}
        />
        <SideDrawer 
          isAuth={this.props.isLogged}
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerCloseHandler} 
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = state =>({
  isLogged: state.authReducer.token !== null,
});

export default connect(mapStateToProps)(Layout);
