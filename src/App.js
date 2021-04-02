import './App.css';

import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const asyncCheckout = lazy(() => import ('./containers/Checkout/Checkout'));
const asyncAuth = lazy(() => import('./containers/Auth/Auth'));
const asyncOrders = lazy(() => import('./containers/Orders/Orders'));


class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignin();
    }

    render() {

        let routes = (

            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>

            );
        }

        return (
            <div>
                <Layout />
                <Suspense fallback={<div>Loading ...</div>}>
                    {routes}
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
