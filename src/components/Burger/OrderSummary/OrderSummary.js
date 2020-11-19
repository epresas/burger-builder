import React, { Component } from 'react';
import styleClasses from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

export class OrderSummary extends Component {

  render() {
    const ingredientsSummary = Object.entries(this.props.ingredients)
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
        <p>Total price: {this.props.price.toFixed(2)}€</p>
        <p className={styleClasses.SummaryFooter}>Proceed to checkout!</p>
        <Button clicked={this.props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
      </>
    )
  }
}

export default OrderSummary

