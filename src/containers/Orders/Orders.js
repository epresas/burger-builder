import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux'

import Order from './Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {
  const {token, userId, onFetchOrders} = props;

  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  
    let orders = <Spinner/>;
    if (!props.loading) {
      orders = <div>
        {props.orders.map(order =>( 
          <Order 
            key={order.id} 
            ingredients={order.ingredients}
            price={+order.price}
        />))}
      </div>
    }
  
    return orders;
};

const mapStateToProps = state => ({
  orders: state.orderReducer.orders,
  loading: state.orderReducer.loading,
  token: state.authReducer.token,
  userId: state.authReducer.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));
