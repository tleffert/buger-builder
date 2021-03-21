import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        purchasing: false
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

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
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
    }

}


export default BurgerBuilder;
