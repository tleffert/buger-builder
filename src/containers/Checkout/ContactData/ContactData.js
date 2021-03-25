import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import styles from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact info.</h4>
                <form>
                    <input type="text" name="name" placeholder="Tim"/>
                    <input type="email" name="email" placeholder="Tim@sausages.com"/>
                    <input type="text" name="street" placeholder="Tim"/>
                    <input type="text" name="postal" placeholder="Tim"/>
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
