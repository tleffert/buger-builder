import React from 'react';

import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            console.log(ingKey, props.ingredients[ingKey]);
            // Appends BurgerIngredients for v number per key
            return [...Array(props.ingredients[ingKey])].map((_, index) => {
                return <BurgerIngredient key={ingKey + index} type={ingKey}/>
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if(!transformedIngredients.length) {
        transformedIngredients = <p>Please add more ingredients</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
