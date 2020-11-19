import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../axios-orders'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.0,
  bacon: 0.9,
};

export class BurgerBuilder extends Component {
  static propTypes = {

  }

  state = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
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
    // this.setState({isLoading: true});
    // // append .json extension to route for firebase to work
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice.toFixed(2),
    //   customer: {
    //     name: 'Edmundo Presas',
    //     address: {
    //       street: 'Test street',
    //       number: '4',
    //       zipCode: '28100',
    //       country: 'Spain',
    //     },
    //     email: 'test@test.com',
    //   },
    //   shippingType: 'delivery',
    // };

    // axios.post('/orders.json', order)
    //   .then(response => {
    //       this.setState({ 
    //         isLoading: false,
    //         purchasingMode: false,
    //       });
    //     })
    //   .catch(error => {
    //     this.setState({ 
    //       isLoading: false,
    //       purchasingMode: false,
    //      });
    //   });
    const queryParams = [];
    // encode the ingredients in the state for the url
    for (const i in this.state.ingredients) {
      queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
    }
    // generate the query string
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`,
    });
  }

  managePurchasableState = (ingredients) => {
    const totalIngredients = Object.values(ingredients).reduce((total, quantity) =>  total + quantity, 0);
    
    this.setState({ isPurchasable: totalIngredients > 0 });
  }

  addIngredientHandler = (type) => {
    const currentCount = this.state.ingredients[type];
    const updatedCount = currentCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.managePurchasableState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const currentCount = this.state.ingredients[type];
    const updatedCount = currentCount > 0 ? currentCount - 1 : 0;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    const currentTotalPrice = this.state.totalPrice;
    const ingredientPrice = INGREDIENT_PRICES[type];
    updatedIngredients[type] = updatedCount;

    const updatedPrice = currentTotalPrice > ingredientPrice ? 
      currentTotalPrice - INGREDIENT_PRICES[type] :
      0;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.managePurchasableState(updatedIngredients);
  }

  render() {
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>; 
    // Control disabling of remove button
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    
    // Remove spinner after burger ingredients are fetched from the server
    if (this.state.ingredients) {

      burger = (
        <>
          <Burger ingredients = {this.state.ingredients} />
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            isPurchasable = {this.state.isPurchasable}
            ordered={this.purchaseHandler}
          />
        </>
      );
       // Add a spinner when making an order
      orderSummary =  <OrderSummary 
        ingredients={this.state.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}
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

export default WithErrorHandler(BurgerBuilder, axios);
