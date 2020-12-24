import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
export class BurgerBuilder extends Component {
  static propTypes = {

  }

  // Using state only for the UI, redux for data
  state = {
    purchasingMode: false,
  }

  componentDidMount() {
    // Dispatch fetch action to redux
    this.props.onInitIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasingMode: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasingMode: false});
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  managePurchasableState = (ingredients) => {
    const totalIngredients = Object.values(ingredients).reduce((total, quantity) =>  total + quantity, 0);
    
    return totalIngredients > 0;
  }


  render() {
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>; 
    // Control disabling of remove button
    const disabledInfo = {
      ...this.props.ings
    };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    
    // Remove spinner after burger ingredients are fetched from the server
    if (this.props.ings) {

      burger = (
        <>
          <Burger ingredients = {this.props.ings} />
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            isPurchasable = {this.managePurchasableState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth = {this.props.isAuthenticated}
          />
        </>
      );
       // Add a spinner when making an order
      orderSummary =  <OrderSummary 
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price}
      />;

    if (this.state.isLoading) {
      orderSummary = <Spinner />;
    }

    }

    return (
      <>
       <Modal show={this.state.purchasingMode} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
       </Modal>
      {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error,
    isAuthenticated: state.authReducer.token !== null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
