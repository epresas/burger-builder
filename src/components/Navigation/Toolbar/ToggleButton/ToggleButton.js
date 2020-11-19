import React from 'react'
import styleClasses from './ToggleButton.module.css';

const toggleButton = (props) => (
  <div className={styleClasses.ToggleButton} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default toggleButton
