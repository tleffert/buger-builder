import './App.css';

import React, { Component, Suspense, lazy, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const Checkout = lazy(() => import ('./containers/Checkout/Checkout'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Orders = lazy(() => import('./containers/Orders/Orders'));


const App = (props) => {
    const {onTryAutoSignin} = props;

    useEffect(() => {
        onTryAutoSignin();
    }, [onTryAutoSignin]);

        let routes = (

            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/auth" component={Auth} />
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
