import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {props.ingredients[ingKey]}
                </li>
            );
        })

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
        </Fragment>
    );
};

export default orderSummary;
