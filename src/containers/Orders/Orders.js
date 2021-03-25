import React, { Component } from 'react';

import OrdersApi from '../../axios-orders';

import Order from '../../components/Order/Order';

import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        order: [],
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
                    order: fetchedOrders
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
                <Order />
                <Order />
            </div>
        );
    }
}

export default withErrorHandler(Orders, OrdersApi);
