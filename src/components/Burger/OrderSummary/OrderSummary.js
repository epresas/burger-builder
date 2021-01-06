import React from 'react';
import styleClasses from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
  const ingredientsSummary = Object.entries(props.ingredients)
    .map(([key, value]) => <li key={key} className={styleClasses.Item}>
      <span>{key}:</span> {value}
    </li>);
  return (
    <>
      <h3 className={styleClasses.SummaryTitle}>Your Order</h3>
      <p>Burger with the following ingredients:</p>
      <ul className={styleClasses.ItemsList}>
        {ingredientsSummary}
      </ul>
      <p>Total price: {props.price.toFixed(2)}€</p>
      <p className={styleClasses.SummaryFooter}>Proceed to checkout!</p>
      <Button clicked={props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
      <Button clicked={props.purchaseContinued} btnType='Success'>CONTINUE</Button>
    </>
  )
}

export default OrderSummary;

