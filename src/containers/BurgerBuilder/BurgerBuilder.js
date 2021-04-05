import React, { Component, Fragment, useState, useEffect, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

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

    const dispatch = useDispatch();

    const ingredients = useSelector((state) => {
        return state.burgerBuilder.ingredients;
    });

    const totalPrice = useSelector((state) => {
        return state.burgerBuilder.totalPrice;
    });

    const error = useSelector((state) => {
        return state.burgerBuilder.error;
    });

    const isAuthenticated = useSelector((state) => {
        return !!state.auth.token;
    });

    const onIngredientAdd = (ingredient) => dispatch(addIngredient(ingredient));
    const onIngredientRemove = (ingredient) => dispatch(removeIngredient(ingredient));
    const onInitIngredients = useCallback(() => dispatch(initIngredients()), []);
    const onInitPurchase = () => dispatch(purchaseInit());
    const onSetRedirectPath = (path) => dispatch(setAuthRedirect(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

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
            onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const puchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }


    const disabledInfo = {
        ...ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ingredients) {
        burger = (
           <Fragment>
               <Burger ingredients={ingredients}/>
               <BuildControls
                   ingredientAdd={onIngredientAdd}
                   ingredientRemove={onIngredientRemove}
                   disabled={disabledInfo}
                   purchasable={updatePurchaseState(ingredients)}
                   price={totalPrice}
                   ordered={purchaseHandler}
                   isAuthenticated={isAuthenticated}
               />
           </Fragment>
       );
        orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={puchaseContinueHandler}
                price={totalPrice}
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

export default withErrorHandler(BurgerBuilder, OrdersApi);
