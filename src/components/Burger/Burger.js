import React from 'react'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let parsedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
    // Return the ingredients extracted from an Array created with the length of 
    // the quantity of ingredients defined in the state passed to this component
      return [...Array(props.ingredients[ingredientKey])].map((_el, i) => {
        return <BurgerIngredient key = {ingredientKey + i} type={ingredientKey} />;
      });
    })
    // flatten the array to check its length
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    // If no ingredients, suggest it to the user
  if (!parsedIngredients.length) {
    parsedIngredients = <p>Start adding ingredients!</p>;
  }

  return(
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
      {parsedIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
};

export default burger;