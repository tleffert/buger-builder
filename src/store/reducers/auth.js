import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED,
    SIGNUP_START, SIGNUP_SUCCESS, SIGNUP_FAILED } from '../actions/actions';

const initState = {
    token: null,
    id: null,
    error: null,
    loading: false
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case SIGNUP_START:
        case AUTH_START: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }

        case SIGNUP_SUCCESS:
        case AUTH_SUCCESS: {
            return {
                ...state,
                token: action.payload.token,
                id: action.payload.id,
                loading: false,
                error:  false
            }
        }

        case SIGNUP_FAILED:
        case AUTH_FAILED: {
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }
        }
    }

    return state;
}

export default reducer;
