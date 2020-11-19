import React from 'react';
import burgerLogo from '../../assets/img/burger-logo.png';
import styleClasses from './Logo.module.css';

const logo = (props) => (
  <div className={styleClasses.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="logo"/>
  </div>
);

export default logo