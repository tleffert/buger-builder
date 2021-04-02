import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { auth, signup } from '../../store/actions/index';

import styles from './Auth.module.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'email@email.com'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLengthL: 7
                },
                valid: false,
                touched: false
            },
        },
        isSignup: false

    }

    checkValidity(value, rules) {
        let isValid = true;

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

    inputChangeHandler = (event, controlName) => {
        const updatedForm = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        let formIsValid = true;

        for(let inputIdentifies in updatedForm) {
            formIsValid = updatedForm[inputIdentifies].valid && formIsValid;
        }

        this.setState({
            controls: updatedForm,
            formIsValid: formIsValid
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const pass = this.state.controls.password.value;

        if (this.state.isSignup) {
            this.props.onSignup(email, pass);
        } else {
            this.props.onAuth(email, pass);
        }
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {

        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = <Spinner />;

        if (!this.props.authLoading) {
            form = formElementsArray.map(ele => (
               <Input
                   key={ele.id}
                   elementType={ele.config.elementType}
                   elementConfig={ele.config.elementConfig}
                   value={ele.config.value}
                   invalid={!ele.config.valid}
                   shouldValidate={ele.config.validation}
                   touched={ele.config.touched}
                   change={(event) => this.inputChangeHandler(event, ele.id)}
               />
           ));
        }

        let errorMessage = null;

        if (this.props.authError) {
            errorMessage = (
                <p>{this.props.authError.message}</p>
            );
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />;
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage ? <small className={styles.Danger}>{errorMessage}</small> : null}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger"
                    clicked={this.switchAuthHandler}
                >Switch to {this.state.isSignup ? 'Sign in' : 'Signup'}</Button>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        authLoading: state.auth.loading,
        authError: state.auth.error,
        isAuthenticated: !!state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, pass) => dispatch(auth(email, pass)),
        onSignup: (email, pass) => dispatch(signup(email, pass))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
