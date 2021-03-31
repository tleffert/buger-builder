import * as actionTypes from '../actions/actions';

const initState = {
    orders: [],
    loading: false,
    purchased: false,
    error: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.PURCHASE_BURGER_START: {
            return {
                ...state,
                loading: true
            }
        }

        case actionTypes.PURCHASE_BURGER_SUCCESS: {

            const newOrder = {
                ...action.payload.orderData,
                id: action.payload.orderId
            }

            return {
                ...state,
                loading: false,
                purchased: true,
                order: state.orders.concat(newOrder)
            };
        }

        case actionTypes.PURCHASE_BURGER_FAIL: {
            return {
                ...state,
                loading: false
            };
        }

        case actionTypes.PURCHASE_INIT: {
            return {
                ...state,
                purchased: false
            }
        }

        case actionTypes.FETCH_ORDERS_INIT: {
            return {
                ...state,
                loading: true
            }
        }

        case actionTypes.FETCH_ORDERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                orders: [...action.payload.orders]
            }
        }

        case actionTypes.FETCH_ORDERS_FAILED: {
            return {
                ...state,
                loading: false,
                error: true
            }
        }

        default: {
            return state;
        }

    }
}

export default reducer;
