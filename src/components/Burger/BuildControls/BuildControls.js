import React from 'react';

import styleClasses from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
  {label: 'Bacon', type: 'bacon'},
]

const buildControls = (props) => (
  <div className={styleClasses.BuildControls}>
   <p>Current price: <strong>{props.price.toFixed(2)} €</strong></p>
    {controls.map(control => (
      <BuildControl 
        key={control.label} 
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled= {props.disabled[control.type]}
        />)
    )}

    <button 
      className= {styleClasses.OrderButton}
      disabled={!props.isPurchasable}
      onClick={props.ordered}
    >ORDER</button>
  </div>
);

export default buildControls
