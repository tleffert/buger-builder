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
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {

        console.log("addIngredientHandler", type, this.state);

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

    }

    render() {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdd={this.addIngredientHandler}
                />
            </Fragment>
        );
    }

}


export default BurgerBuilder;
