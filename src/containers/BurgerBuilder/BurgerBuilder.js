import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import OrdersApi from '../../axios-orders';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        error: null
    }

    componentDidMount() {
        axios.get('https://react-burger-builder-bcdd6-default-rtdb.firebaseio.com/ingredients.json')
            .then(({data}) => {
                this.setState({
                    ingredients: data
                });
            }).catch(error => {
                this.setState({error: error});
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0)

        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredientes = {
            ...this.state.ingredients
        };

        updatedIngredientes[type] = updatedCount;
        console.log("UPDATED INGREDIENTS", updatedIngredientes);
        const oldPrice = this.state.totalPrice;
        this.setState({
            totalPrice: oldPrice + INGREDIENT_PRICES[type],
            ingredients: updatedIngredientes
        });
        this.updatePurchaseState(updatedIngredientes);
    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredientes = {
            ...this.state.ingredients
        };

        updatedIngredientes[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        this.setState({
            totalPrice: oldPrice - INGREDIENT_PRICES[type],
            ingredients: updatedIngredientes
        });

        this.updatePurchaseState(updatedIngredientes);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    puchaseContinueHandler = () => {
        // this.setState({
        //     loading: true
        // });
        //
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.price,
        //     customer:{
        //         name: 'Trevor Leffert',
        //         address: {
        //             street: 'Teststreet #000',
        //             zip: '4444444',
        //             country: 'US'
        //         },
        //         email: 'email@email.com'
        //     },
        //     deliveryMethod: 'slow'
        // }
        //
        // OrdersApi.post('/orders', order)
        //     .then(response => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         });
        //     })
        //

        const queryParams = [];

        for(const [key, value] of Object.entries(this.state.ingredients)) {
            queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        }



        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryParams.join('&')}`
        });
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
               <Fragment>
                   <Burger ingredients={this.state.ingredients}/>
                   <BuildControls
                       ingredientAdd={this.addIngredientHandler}
                       ingredientRemove={this.removeIngredientHandler}
                       disabled={disabledInfo}
                       purchasable={this.state.purchasable}
                       price={this.state.totalPrice}
                       ordered={this.purchaseHandler}
                   />
               </Fragment>
           );
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.puchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            );
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }

}


export default withErrorHandler(BurgerBuilder, OrdersApi);
