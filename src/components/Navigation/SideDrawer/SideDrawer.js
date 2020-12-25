import React from 'react';

import styleClasses from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = (props) => {

  let attachedClasses = [styleClasses.SideDrawer, styleClasses.Close];

  if (props.open) {
    attachedClasses = [styleClasses.SideDrawer, styleClasses.Open];
  }
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={styleClasses.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </>
  );
}

export default sideDrawer;