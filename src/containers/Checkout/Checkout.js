import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        totalPrice: null
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = null;
        for(const [key, value] of query.entries()) {
            if (key === 'price') {
                price = +value;
            } else {
                ingredients[key] = +value;
            }

        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                />
            </div>
        );
    }
}

export default Checkout;
