import * as actionTypes from  './actions';
import axios from '../../axios-orders';

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

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-bcdd6-default-rtdb.firebaseio.com/ingredients.json')
            .then(({data}) => {
                dispatch(setIngredients(data))
            }).catch(error => {
                dispatch(setIngredients(fetchIngredientsFailed()))
            })
    }
}
