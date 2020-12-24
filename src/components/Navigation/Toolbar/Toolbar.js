import React from 'react';
import styleClasses from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from './ToggleButton/ToggleButton';

const toolbar = (props) => (
  <header className={styleClasses.Toolbar}>
    <ToggleButton clicked={props.opened} />
    <div className={styleClasses.Logo}>
     <Logo />
    </div>
    <nav className={styleClasses.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);


export default toolbar;