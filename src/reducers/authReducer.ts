import axios from 'axios'
import { server } from '../config/index'

const INITIAL_STATE = {
    loggedIn: false,
    loading: false,
    errors: {
        email: '',
        password: '',
        username: '',
        fullError: ''
    },
}

export const LOG_IN_START = 'LOG_IN_START'
export const LOG_IN_END = 'LOG_IN_END'
export const LOG_IN_FAIL = 'LOG_IN_FAIL'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'

export const AUTH_ACTIONS = {
    LOG_IN_START,
    LOG_IN_END,
    LOG_IN_FAIL,
    LOG_IN_SUCCESS
}

export const login = ({ email, password }: { email: string, password: string }) => async (dispatch: any) => {
    dispatch({
        type: LOG_IN_START,
        payload: { loading: true }
    })

    const data = { email, password }

    try {
        const result = (await axios.post(`${server}/api/authentication/login`, data, { withCredentials: true })).data

        dispatch({
            type: LOG_IN_SUCCESS,
            payload: { loading: false, loggedIn: true }
        })

        dispatch({
            type: LOG_IN_END,
            payload: { loading: false }
        })
    } catch (err: any) {
        if(err && err.response && err.response.data.type && err.response.data.type === 'email') {
            dispatch({
                type: LOG_IN_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'email' }
            })
        } else if(err && err.response && err.response.data.type && err.response.data.type === 'password') {
            dispatch({
                type: LOG_IN_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'password' }
            })
        } else if(err && err.response && err.response.data.type && err.response.data.type === 'both') {
            dispatch({
                type: LOG_IN_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'both' }
            })
        } else {
            dispatch({
                type: LOG_IN_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'fullError' }
            })
        }
    }

    dispatch({
        type: LOG_IN_END,
        payload: { loading: false }
    })
}

const reducer = (state = INITIAL_STATE, action: any) => {
    switch(action.type) {
        case LOG_IN_START: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        case LOG_IN_END: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        case LOG_IN_FAIL: {
            return {
                ...state,
                loading: action.payload.loading,
                loggedIn: action.payload.loggedIn,
                errors: {
                    [ action.payload.name ]: action.payload.error
                }
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                loading: action.payload.loading,
                loggedIn: action.payload.loggedIn
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;