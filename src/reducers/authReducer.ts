const INITIAL_STATE = {
    loggedIn: false,
    loading: false,    
    username: '',
    email: '',
    userId: '',
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
    LOGOUT = 'LOGOUT',
}

const reducer: any = (state = INITIAL_STATE, action: any) => {
    switch(action.type) {
        case AUTH_ACTIONS.LOGGED_IN: {
            return {
                ...state,
                loggedIn: true,
                username: action.payload.username,
                email: action.payload.email,
                userId: action.payload.id
            }
        }
        case AUTH_ACTIONS.NOT_LOGGED_IN: {
            return {
                ...state,
                loggedIn: false,
                username: '',
                email: '',
                userId: ''
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
                    confirmPassword: '',
                    username: '',
                    fullError: '',
                    code: ''
                },
                loading: false
            }
        }
        case AUTH_ACTIONS.LOGOUT: {
            return {
                loggedIn: false,
                username: '',
                email: '',
                userId: '',
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
                loggedIn: true,
                email: action.payload.result.email, 
                userId: action.payload.result.id,
                username: action.payload.result.name
            }
        }
        case AUTH_ACTIONS.REGISTER_FAIL: {
            return {
                ...state,
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
                loggedIn: false,
                errors: {
                    [ action.payload.name ]: action.payload.error
                }
            }
        }
        case AUTH_ACTIONS.CODE_REGISTER_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                email: action.payload.email, 
                userId: action.payload.id,
                username: action.payload.name
            }
        }
        case AUTH_ACTIONS.FP_FAIL: {
            return {
                ...state,
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