import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'; 
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {

  const [ purchasingMode, setPurchasingMode ] = useState(false);

  // Replaces mapDispatchToProps (both alternatives are good)
  const dispatch = useDispatch();

  // Replaces mapStateToProps (both alternatives are good)
  const ings = useSelector(state => state.burgerBuilderReducer.ingredients);
  const price = useSelector(state => state.burgerBuilderReducer.totalPrice);
  const error = useSelector(state => state.burgerBuilderReducer.error);
  const isAuthenticated = useSelector(state => state.authReducer.token !== null);
  const isLoading = useSelector(state => state.authReducer.loading);
  
  const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved =  (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients =  useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase =  () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
  

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasingMode(true);
    } else {
      onSetAuthRedirectPath('/checkout')
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasingMode(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

  const managePurchasableState = (ingredients) => {
    const totalIngredients = Object.values(ingredients).reduce((total, quantity) =>  total + quantity, 0);
    
    return totalIngredients > 0;
  }



    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>; 
    // Control disabling of remove button
    const disabledInfo = {
      ...ings
    };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    
    // Remove spinner after burger ingredients are fetched from the server
    if (ings) {

      burger = (
        <>
          <Burger ingredients = {ings} />
          <BuildControls 
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            price={price}
            isPurchasable = {managePurchasableState(ings)}
            ordered={purchaseHandler}
            isAuth = {isAuthenticated}
          />
        </>
      );
       // Add a spinner when making an order
      orderSummary =  <OrderSummary 
        ingredients={ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={price}
      />;

    if (isLoading) {
      orderSummary = <Spinner />;
    }

    }

    return (
      <>
        <Modal show={purchasingMode} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      {burger}
      </>
    );
};

export default WithErrorHandler(BurgerBuilder, axios);
