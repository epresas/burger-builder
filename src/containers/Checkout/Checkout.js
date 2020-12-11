import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

import styleClasses from './Checkout.module.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';


export class Checkout extends Component {
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
            ingredients= {this.props.ings}
            onCheckoutCancelled={this.checkoutCancelledHandler}
            onCheckoutContinued={this.checkoutContinuedHandler}
          />
          <Route 
            path={`${this.props.match.path}/contact-info`}
            component={ContactInfo}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  };
} 

export default connect(mapStateToProps)(Checkout)
