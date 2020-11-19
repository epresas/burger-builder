import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styleClasses from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={styleClasses.CheckoutSummary}>
      <h2>Enjoy!</h2>
      <div className={styleClasses.BurgerContainer}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button 
        btnType='Danger'
        clicked={props.onCheckoutCancelled}
      >CANCEL</Button>
      <Button 
        btnType='Success'
        clicked={props.onCheckoutContinued}
      >CONTINUE</Button>
    </div>
  );
}

export default checkoutSummary;
