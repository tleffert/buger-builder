import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import OrdersApi from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

class ContactData extends Component {
    state = {
        loading: false,
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            zip:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your zip'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email@email.com'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'slow', label: 'SLOW'}, {value: 'fast', label: 'FAST'}]
                },
                value: ''
            }
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

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

    inputChangeHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormEle = {
            ...updatedOrderForm[inputId]
        };

        updatedFormEle.value = event.target.value;
        updatedOrderForm[inputId] = updatedFormEle;
        this.setState({
            orderForm: updatedOrderForm
        })
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
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        change={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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

export default ContactData;
