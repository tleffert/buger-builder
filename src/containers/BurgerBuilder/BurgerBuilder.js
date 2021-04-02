import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import OrdersApi from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import {addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirect} from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0)

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            });
        } else {
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    puchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.props.ingredients) {
                burger = (
                   <Fragment>
                       <Burger ingredients={this.props.ingredients}/>
                       <BuildControls
                           ingredientAdd={this.props.onIngredientAdd}
                           ingredientRemove={this.props.onIngredientRemove}
                           disabled={disabledInfo}
                           purchasable={this.updatePurchaseState(this.props.ingredients)}
                           price={this.props.totalPrice}
                           ordered={this.purchaseHandler}
                           isAuthenticated={this.props.isAuthenticated}
                       />
                   </Fragment>
               );
                orderSummary = (
                    <OrderSummary
                        ingredients={this.props.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.puchaseContinueHandler}
                        price={this.props.totalPrice}
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
