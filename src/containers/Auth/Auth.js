import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { auth, signup, setAuthRedirect } from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

import styles from './Auth.module.css';

const Auth = (props) => {

    const [controls, setControls] = useState({
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
        });

    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        if (!props.bbBuilding && props.authRedirect !== '/') {
            props.onSetAuthRedirect();
        }
    },[])

    const inputChangeHandler = (event, controlName) => {
        const updatedForm = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        setControls(updatedForm);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const email = controls.email.value;
        const pass = controls.password.value;

        if (isSignup) {
            props.onSignup(email, pass);
        } else {
            props.onAuth(email, pass);
        }
    }

    const switchAuthHandler = () => {
        setIsSignup(!isSignup);
    }

    const formElementsArray = [];

    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = <Spinner />;

    if (!props.authLoading) {
        form = formElementsArray.map(ele => (
           <Input
               key={ele.id}
               elementType={ele.config.elementType}
               elementConfig={ele.config.elementConfig}
               value={ele.config.value}
               invalid={!ele.config.valid}
               shouldValidate={ele.config.validation}
               touched={ele.config.touched}
               change={(event) => inputChangeHandler(event, ele.id)}
           />
       ));
    }

    let errorMessage = null;

    if (props.authError) {
        errorMessage = (
            <p>{props.authError.message}</p>
        );
    }

    let authRedirect = null;

    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirect} />;
    }

    return (
        <div className={styles.Auth}>
            {authRedirect}
            {errorMessage ? <small className={styles.Danger}>{errorMessage}</small> : null}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button btnType="Danger"
                clicked={switchAuthHandler}
            >Switch to {isSignup ? 'Sign in' : 'Signup'}</Button>
        </div>

    );
}

const mapStateToProps = (state) => {
    return {
        authLoading: state.auth.loading,
        authError: state.auth.error,
        isAuthenticated: !!state.auth.token,
        bbBuilding: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, pass) => dispatch(auth(email, pass)),
        onSignup: (email, pass) => dispatch(signup(email, pass)),
        onSetAuthRedirect: () => dispatch(setAuthRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
