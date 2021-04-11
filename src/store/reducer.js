import * as actionType from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        paprika: 0
    },
    totalPrice: 5,
}

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 1.5,
    meat: 3.5,
    bacon: 2.3,
    paprika: 1.2,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientType] :state.ingredients[action.ingredientType] +1
                 } ,
                 totalPrice : state.totalPrice + INGREDIENT_PRICES[action.actionType]
                // totalPrice : newPrice
            }
        case actionType.REMOVE_INGREDIENT: 
            return {
                ...state,
                ingredients :{
                    ...state.ingredients,
                    [action.ingredientType] :state.ingredients[action.ingredientType] -1
                 } ,
                 totalPrice : state.totalPrice - INGREDIENT_PRICES[action.actionType]
            }
    }
    return state;
}

export default reducer;