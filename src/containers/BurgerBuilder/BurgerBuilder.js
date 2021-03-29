import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import OrdersApi from '../../axios-orders';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        error: null,
        loading: false
    }

    componentDidMount() {
        // axios.get('https://react-burger-builder-bcdd6-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(({data}) => {
        //         this.setState({
        //             ingredients: data
        //         });
        //     }).catch(error => {
        //         this.setState({error: error});
        //     })
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

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

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
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredient) => dispatch({type: actionTypes.ADD_INGREDIENT, payload: { ingredient: ingredient}}),
        onIngredientRemove: (ingredient) => dispatch({type: actionTypes.REMOVE_INGREDIENT, payload: { ingredient: ingredient}})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, OrdersApi));
