import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import styleClasses from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';


export class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  }
  UNSAFE_componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    // iterate through the query and construct the ingredients object
    for (const param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients, price});
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
          <Route 
            path={`${this.props.match.path}/contact-info`}
            render={(props) => <ContactInfo 
              ingredients={this.state.ingredients}
              price= {this.state.price}
              {...props}
            />}
          />
        </div>
      </div>
    )
  }
}

export default Checkout
