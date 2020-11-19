import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import styleClasses from './Checkout.module.css';


export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0,
    }
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    // iterate through the query and construct the ingredients object
    for (const param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients});

    console.log(query.sort())
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-info');
  }

  render() {
    return (
      <div>
        <div>
          <CheckoutSummary 
            ingredients= {this.state.ingredients}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
          />
        </div>
      </div>
    )
  }
}

export default Checkout
