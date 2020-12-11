import React from 'react'
import styleClasses from './Button.module.css';

const button = (props) => (
  <button
    onClick= {props.clicked}
    className={[styleClasses.Button, styleClasses[props.btnType]].join(' ')}
    disabled={props.disabled}
  >{props.children}</button>
);

export default button
