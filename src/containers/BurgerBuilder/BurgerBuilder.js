import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        totalPrice: 4
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
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdd={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Fragment>
        );
    }

}


export default BurgerBuilder;
