import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux'

import Order from './Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }
  
  render() {
    let orders = <Spinner/>;
    if (!this.props.loading) {
      orders = <div>
        {this.props.orders.map(order =>( 
          <Order 
            key={order.id} 
            ingredients={order.ingredients}
            price={+order.price}
        />))}
      </div>
    }
    
    return orders;
  }
}

const mapStateToProps = state => ({
  orders: state.orderReducer.orders,
  loading: state.orderReducer.loading,
  token: state.authReducer.token,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));
