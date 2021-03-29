import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import OrdersApi from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

class ContactData extends Component {
    state = {
        loading: false,
        formIsValid: false,
        orderForm: {
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
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const formData = {};

        for(let formEleId in this.state.orderForm) {
            formData[formEleId] = this.state.orderForm[formEleId];
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Trevor Leffert',
                address: {
                    street: 'Teststreet #000',
                    zip: '4444444',
                    country: 'US'
                },
                email: 'email@email.com'
            },
            deliveryMethod: 'slow'
        }

        OrdersApi.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
    }

    checkValidity(value, rules) {
        let isValid = true;
        console.log(value, rules)
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormEle = {
            ...updatedOrderForm[inputId]
        };

        updatedFormEle.value = event.target.value;
        updatedFormEle.valid = this.checkValidity(updatedFormEle.value, updatedFormEle.validation);
        updatedFormEle.touched = true;
        updatedOrderForm[inputId] = updatedFormEle;

        let formIsValid = true;

        for(let inputIdentifies in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifies].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            console.log(key, this.state.orderForm[key]);
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
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
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact info.</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
