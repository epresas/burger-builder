import React from 'react';

import styleClasses from './FormInput.module.css';

const formInput = (props) => {
  let inputEl = null;
  let validationError = null;
  const classesArray = [styleClasses.Input];

  if (props.value) {
    classesArray.push(styleClasses.IsFilled);
  }

  if (props.invalid && props.shouldValidate && props.touched) {
    classesArray.push(styleClasses.Invalid);
  }
  if (props.invalid && props.touched) {
    validationError = <p className={styleClasses.ValidationError}>Please enter a valid value!</p>;
  }

  switch (props.elementType) {
    case 'input':
      inputEl = <input 
        className={classesArray.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} 
      />
      break;

    case 'textarea':
      inputEl = <textarea 
        className={classesArray.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} 
      />
      break;

    case 'dropdown':
      inputEl = <select 
        className={classesArray.join(' ')} 
        value={props.value}
        onChange={props.changed}
        >
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
      break;

    case 'checkbox':
      inputEl = <checkbox 
        className={classesArray.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} 
      />
      break;

    case 'radio':
      inputEl = <radio 
        className={classesArray.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} 
      />
      break;
  
    default:
      inputEl = <input 
        className={classesArray.join(' ')} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed} 
      />
      break;
  }

  return (
    <div className={styleClasses.InputGroup}>
      {inputEl}
      <label className={styleClasses.Label} htmlFor={props.id}>{props.elementConfig.label}</label>
      {validationError}
    </div>
  );
}

export default formInput;
