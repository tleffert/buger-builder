import React, { Component, Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import OrdersApi from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import {addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirect} from '../../store/actions/index';

const BurgerBuilder = (props) => {

    // const [totalPrice, setTotalPrice] = useState(4);
    const [purchaseble, setPurchaseable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, [])


    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0)

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const puchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }


    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (props.ingredients) {
        burger = (
           <Fragment>
               <Burger ingredients={props.ingredients}/>
               <BuildControls
                   ingredientAdd={props.onIngredientAdd}
                   ingredientRemove={props.onIngredientRemove}
                   disabled={disabledInfo}
                   purchasable={updatePurchaseState(props.ingredients)}
                   price={props.totalPrice}
                   ordered={purchaseHandler}
                   isAuthenticated={props.isAuthenticated}
               />
           </Fragment>
       );
        orderSummary = (
            <OrderSummary
                ingredients={props.ingredients}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={puchaseContinueHandler}
                price={props.totalPrice}
            />
        );
    }

    return (
        <Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: !!state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredient) => dispatch(addIngredient(ingredient)),
        onIngredientRemove: (ingredient) => dispatch(removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetRedirectPath: (path) => dispatch(setAuthRedirect(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, OrdersApi));
