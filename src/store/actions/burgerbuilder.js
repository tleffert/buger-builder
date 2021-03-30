import * as actionTypes from  './actions';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {
            ingredientName: ingredientName
        }
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredientName: ingredientName
        }
    }
}
