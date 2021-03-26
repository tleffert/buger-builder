import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import OrdersApi from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

class ContactData extends Component {
    state = {
        loading: false,
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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

    render() {

        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Tim"/>
                <Input inputtype="input" type="email" name="email" placeholder="Tim@sausages.com"/>
                <Input inputtype="input" type="text" name="street" placeholder="Tim"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Tim"/>
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
