import React from 'react';
import styleClasses from './Order.module.css'

const order = (props) => (
  <div className={styleClasses.Order}>
    <p>Ingredients: <strong></strong></p>
    <p>Price: <strong> €</strong> </p>
  </div>
)

export default order;