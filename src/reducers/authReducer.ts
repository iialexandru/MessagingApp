const INITIAL_STATE = {
    loggedIn: false,
    loading: false,
    errors: {
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        fullError: '',
        code: ''
    }
}


export enum AUTH_ACTIONS {
    DEFAULT_STATE = 'DEFAULT_STATE',
    LOGGED_IN = 'LOGGED_IN',
    NOT_LOGGED_IN = 'NOT_LOGGED_IN',
    START_LOADING = 'START_LOADING',
    STOP_LOADING = 'STOP_LOADING',
    LOG_IN_FAIL = 'LOG_IN_FAIL',
    LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
    REGISTER_FAIL = 'REGISTER_FAIL',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    CODE_REGISTER_FAIL = 'CODE_REGISTER_FAIL',
    CODE_REGISTER_SUCCESS = 'CODE_REGISTER_SUCCESS',
    FP_FAIL = 'FP_FAIL',
    FP_SUCCESS = 'FP_SUCCESS',
}

const reducer = (state = INITIAL_STATE, action: any) => {
    switch(action.type) {
        case AUTH_ACTIONS.LOGGED_IN: {
            return {
                ...state,
                loggedIn: true
            }
        }
        case AUTH_ACTIONS.NOT_LOGGED_IN: {
            return {
                ...state,
                loggedIn: false
            }
        }
        case AUTH_ACTIONS.START_LOADING: {
            return {
                ...state,
                loading: true
            }
        }
        case AUTH_ACTIONS.STOP_LOADING: {
            return {
                ...state,
                loading: false
            }
        }
        case AUTH_ACTIONS.DEFAULT_STATE: {
            return {
                ...state,
                errors: {
                    email: '',
                    password: '',
                    username: '',
                    fullError: '',
                    code: ''
                },
                loading: false
            }
        }
        case AUTH_ACTIONS.LOG_IN_FAIL: {
            return {
                ...state,
                loading: false,
                loggedIn: false,
                errors: {
                    [ action.payload.name ]: action.payload.error
                }
            }
        }
        case AUTH_ACTIONS.LOG_IN_SUCCESS: {
            return {
                ...state,
                loading: false,
                loggedIn: true
            }
        }
        case AUTH_ACTIONS.REGISTER_FAIL: {
            return {
                ...state,
                loading: false,
                loggedIn: false,
                errors: {
                    [ action.payload.name ]: action.payload.error
                }
            }
        }
        case AUTH_ACTIONS.REGISTER_SUCCESS: {
            return {
                ...state,
                loading: false
            }
        }
        case AUTH_ACTIONS.CODE_REGISTER_FAIL: {
            return {
                ...state,
                loading: false,
                loggedIn: false,
                errors: {
                    [ action.payload.name ]: action.payload.error
                }
            }
        }
        case AUTH_ACTIONS.CODE_REGISTER_SUCCESS: {
            return {
                ...state,
                loading: false,
                loggedIn: true
            }
        }
        case AUTH_ACTIONS.FP_FAIL: {
            return {
                ...state,
                loading: false,
                [ action.payload.name ]: action.payload.error
            }
        }
        case AUTH_ACTIONS.FP_SUCCESS: {
            return {
                ...state,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;