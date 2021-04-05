import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';

import OrdersApi from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {

    useEffect(() => {
        props.onFetchOrders();
    }, [])

    let orders = <Spinner />;

    if (!props.loading) {
        orders = props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
        ));
    }

    return (
        <div>
            {orders}
        </div>
    );

}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(fetchOrders())
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, OrdersApi));
