import React from 'react';

import styles from './BuildControls.module.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (

    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    add={() => props.ingredientAdd(ctrl.type)}
                    remove={() => props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))
        }

        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
        >ORDER NOW</button>
    </div>

);

export default buildControls;
