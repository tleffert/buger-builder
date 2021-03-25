

import React, { Component } from 'react';

import OrdersApi from '../../axios-orders';

import Order from '../../components/Order/Order';

import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        OrdersApi.get('/orders.json')
            .then(({data}) => {
                console.log(data);
                const fetchedOrders = [];
                for (const key in data) {
                    fetchedOrders.push({
                        ...data[key],
                        id: key
                    })
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                    ))
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, OrdersApi);
