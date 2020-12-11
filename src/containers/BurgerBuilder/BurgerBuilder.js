import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuildActions from '../../store/actions/index';
export class BurgerBuilder extends Component {
  static propTypes = {

  }

  // Using state only for the UI, redux for data
  state = {
    purchasingMode: false,
    isLoading: false,
    error: false,
  }

  componentDidMount() {
    // Add .json to url from firebase
    axios.get('https://react-burger-builder-e942f.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data,
        })
      })
      .catch(error => {
        this.setState({error: true});
      });
  }

  purchaseHandler = () => {
    this.setState({purchasingMode: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasingMode: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  managePurchasableState = (ingredients) => {
    const totalIngredients = Object.values(ingredients).reduce((total, quantity) =>  total + quantity, 0);
    
    return totalIngredients > 0;
  }


  render() {
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>; 
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
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(burgerBuildActions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(burgerBuildActions.removeIngredient(ingredientName)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
