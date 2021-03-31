import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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

        let summary = <Redirect to="/" />;

        if ( this.props.ingredients ) {
            summary = (
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);
