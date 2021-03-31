import * as actionTypes from './actions';

import axois from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: {
            error: error
        }
    }
}

export const purchaseBurgerStart = (orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axois.post('/orders.json', orderData)
            .then(({data}) => {
                dispatch(purchaseBurgerSuccess(data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            })
    }
}
