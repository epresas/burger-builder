import React from 'react';
import styleClasses from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={styleClasses.NavigationItems}>
    <NavigationItem link="/" exact >Burger builder</NavigationItem>
    { props.isAuthenticated ? 
      <NavigationItem link="/orders">Orders</NavigationItem> : 
      null 
    }
    { !props.isAuthenticated ? 
    <NavigationItem link="/auth">Login</NavigationItem> : 
    <NavigationItem link="/logout">Logout</NavigationItem>
    }
  </ul>
);

export default navigationItems;
