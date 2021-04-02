import './App.css';

import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authCheckState } from './store/actions/index';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignin();
    }

    render() {
        return (
            <div>
                <Layout />
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" component={BurgerBuilder} />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignin: () => dispatch(authCheckState())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
