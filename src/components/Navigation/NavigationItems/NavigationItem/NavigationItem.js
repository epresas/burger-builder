import React from 'react';
import { NavLink } from 'react-router-dom'
import styleClasses from './NavigationItem.module.css'

const navigationItem = (props) => (
  <li className={styleClasses.NavigationItem}> 
    <NavLink 
      to={props.link}
      exact={props.exact}
      // add this attribute to fetch the styles from the css module
      activeClassName={styleClasses.active}
    >{props.children}</NavLink>
  </li>
);

export default navigationItem;
