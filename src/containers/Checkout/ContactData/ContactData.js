import React, { Component, useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import OrdersApi from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../components/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

import styles from './ContactData.module.css';

const ContactData = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [orderForm, setOrderForm] = useState({

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false
                },
                valid: false
            },
            zip:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    touched: false
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email@email.com'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'slow', label: 'SLOW'}, {value: 'fast', label: 'FAST'}]
                },
                value: '',
                validation: {},
                valid: true
            }
    });

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for(let formEleId in orderForm) {
            formData[formEleId] = orderForm[formEleId].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onOrderBurger(order);
    }

    const inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...orderForm
        };

        const updatedFormEle = {
            ...updatedOrderForm[inputId]
        };

        updatedFormEle.value = event.target.value;
        updatedFormEle.valid = checkValidity(updatedFormEle.value, updatedFormEle.validation);
        updatedFormEle.touched = true;
        updatedOrderForm[inputId] = updatedFormEle;

        let formIsValid = true;

        for(let inputIdentifies in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifies].valid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    console.log(orderForm);
    const formElementsArray = [];

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    change={(event) => this.inputChangeHandler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success" clicked={orderHandler} disabled={!formIsValid}>Order</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={styles.ContactData}>
            <h4>Enter your contact info.</h4>
            {form}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.id
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, OrdersApi));
