import axios from 'axios';

import { AUTH_START, AUTH_FAILED, AUTH_SUCCESS,
    SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED } from './actions';


export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSucess = (authData) => {
    return {
        type: AUTH_SUCCESS,
        payload: {
            token: authData.idToken,
            id: authData.localId
        }
    }
}

export const authFailed = (err) => {
    return {
        type: AUTH_FAILED,
        error: err
    }
}

export const auth = (email, pass) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: pass,
            returnSecureToken: true
        }
        axios.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqWw1Vy2GrosEp_j1rUbAgTPpw7F8s_lc',
            authData
        )
        .then(({data}) => {
            console.log(data);
            dispatch(authSucess(data))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailed(err));
        })
    }
}

export const signupStart = () => {
    return {
        type: SIGNUP_START
    }
}

export const signupSucess = (authData) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: {
            token: authData.idToken,
            id: authData.localId
        }
    }
}

export const signFailed = (err) => {
    return {
        type: SIGNUP_FAILED,
        error: err
    }
}

export const signup = (email, pass) => {
    return (dispatch) => {
        dispatch(signupStart());

        const signupData = {
            email: email,
            password: pass,
            returnSecureToken: true
        }

        axios.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqWw1Vy2GrosEp_j1rUbAgTPpw7F8s_lc',
            signupData
        )
        .then(({data}) => {
            dispatch(signupSucess(data))
        })
        .catch(err => {
            console.log(err);
            dispatch(signFailed(err));
        })
    }
}
