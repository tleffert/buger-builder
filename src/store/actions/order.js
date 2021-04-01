import * as actionTypes from './actions';

import axios from '../../axios-orders';

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
        axios.post('/orders.json', orderData)
            .then(({data}) => {
                dispatch(purchaseBurgerSuccess(data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSucess = (order) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: {orders: order}
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        payload: {error: error}
    }
}

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersInit());
        axios.get(`/orders.json?auth=${getState().auth.token}`)
            .then(({data}) => {
                const fetchedOrders = [];
                for (const key in data) {
                    fetchedOrders.push({
                        ...data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSucess(fetchedOrders));
            })
            .catch(err => {
                dispatch((fetchOrdersFailed(err)));
            })
    }
}
