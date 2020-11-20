import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from './Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import styleClasses from './Orders.module.css';

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = []; 

        for (const key in response.data) {
          fetchedOrders.push({
            ...response.data[key], id: key});
        }
        console.trace(fetchedOrders)
        this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(error => {
        this.setState({loading: false});
      })
  }
  
  render() {
    return (
      <div>
        {this.state.orders.map(order =>( 
          <Order 
            key={order.id} 
            ingredients={order.ingredients}
            price={+order.price}
        />))}
      </div>
    )
  }
}

export default WithErrorHandler(Orders, axios);
