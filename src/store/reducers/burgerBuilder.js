import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.0,
  bacon: 0.9,
};

const reducer = (state = initialState, action) => {
  const ingredientName = action.ingredientName;

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingredientName]: state.ingredients[ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],
      };
      case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [ingredientName]: state.ingredients[ingredientName] - 1,
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
      };
  
    default:
      return state;
  }
};

export default reducer;