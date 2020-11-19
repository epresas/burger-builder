import React from 'react'
import styleClasses from './BuildControl.module.css';

const buildControl = (props) => (
  <div className={styleClasses.BuildControl}>
    <div className={styleClasses.Label}>{props.label}</div>
    <button className={styleClasses.More} onClick={props.added}>Add</button>
    <button 
      className={styleClasses.Less} 
      onClick={props.removed}
      disabled= {props.disabled}
      >Remove</button>
  </div>
);

export default buildControl;