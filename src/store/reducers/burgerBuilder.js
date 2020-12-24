import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  isLoading: false,
  error: false,
  building: false,
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
        building: true,
      };
      case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [ingredientName]: state.ingredients[ingredientName] - 1,
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
        building: true,
      };
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients: action.ingredients,
          totalPrice: 4,
          error: false,
        building: false,
      };
      case actionTypes.FETCH_INGREGIENTS_FAILED:
        return {
          ...state,
          error: true,
      };
  
    default:
      return state;
  }
};

export default reducer;