import React, { Component } from 'react';

import Order from './Order/Order'
import styleClasses from './Orders.module.css';

export class Orders extends Component {
  render() {
    return (
      <div className={styleClasses.Orders}>
        <Order />
      </div>
    )
  }
}

export default Orders
