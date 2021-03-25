import './App.css';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
    render() {
        return (
            <div>
                <Layout />
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/" component={BurgerBuilder} />
                </Switch>
            </div>
        );
    }
}

export default App;
