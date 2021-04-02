import axios from 'axios';

import { AUTH_START, AUTH_FAILED, AUTH_SUCCESS,
    SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNOUT, SET_AUTH_REDIRECT } from './actions';


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
        payload: {
            error: err
        }
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
            const expireDate =  new Date(new Date().getTime() + (data.expiresIn * 1000));
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('expirationDate', expireDate);
            localStorage.setItem('userId', data.localId);
            dispatch(authSucess(data));
            dispatch(checkAuthTimeout(data.expiresIn));
        })
        .catch(err => {
            dispatch(authFailed(err.response.data.error));
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
        payload: {
            error: err
        }
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
            const expireDAte =  new Date(new Date() + (data.expiresIn * 1000));
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('expirationDate', expireDAte);
            localStorage.setItem('userId', data.localId);
            dispatch(signupSucess(data));
            dispatch(checkAuthTimeout(data.expiresIn));
        })
        .catch(err => {
            dispatch(signFailed(err.response.data.error));
        })
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: SIGNOUT
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000)
    }
}

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expireDate = new Date(localStorage.getItem('expirationDate'));
            if (expireDate > new Date()) {
                dispatch(authSucess({idToken: token, localId: localStorage.getItem('userId')}));
                dispatch(checkAuthTimeout(new Date().getSeconds() - expireDate.getSeconds()));
            } else {
                dispatch(logout());
            }
        }
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: SET_AUTH_REDIRECT,
        payload: {path: path}
    }
}
