import React from 'react';
import styleClasses from './Order.module.css'

const order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({ 
      name: ingredientName, 
      amount: props.ingredients[ingredientName] 
    });
  }

  const ingredientOutput = ingredients.map(ing => {
    return <span 
      key={ing.name}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 5px'
      }}  
    >{ing.name} ({ing.amount})</span>
  })
  return (
    <div className={styleClasses.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>{props.price.toFixed(2)} €</strong> </p>
    </div>
  )

}

export default order;