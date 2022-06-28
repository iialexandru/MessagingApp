import axios from 'axios'

import { AUTH_ACTIONS } from '../reducers/authReducer'
import { server } from '../config/index'


export const verifyLogin = () => async (dispatch: any) => {
    try {
        await axios.post(`${server}/api/miscellaneous/isAuthenticated`, {}, { withCredentials: true })

        dispatch({
            type: AUTH_ACTIONS.LOGGED_IN
        })
    } catch (err) {
        dispatch({
            type: AUTH_ACTIONS.NOT_LOGGED_IN
        })
    }
}


export const defaultState = () => (dispatch: any) => {
    dispatch({
        type: AUTH_ACTIONS.DEFAULT_STATE
    })
}

export const login = ({ email, password, onSuccess }: { email: string, password: string, onSuccess: () => void }) => async (dispatch: any) => {
    dispatch({
        type: AUTH_ACTIONS.START_LOADING
    })

    const data = { email, password }

    try {
        const result = (await axios.post(`${server}/api/authentication/login`, data, { withCredentials: true })).data

        dispatch({
            type: AUTH_ACTIONS.LOG_IN_SUCCESS,
            payload: { result }
        })

        return onSuccess()

    } catch (err: any) {
        if(err && err.response && err.response.data.type && err.response.data.type === 'email') {
            dispatch({
                type: AUTH_ACTIONS.LOG_IN_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'email' }
            })
        } else if(err && err.response && err.response.data.type && err.response.data.type === 'password') {
            dispatch({
                type: AUTH_ACTIONS.LOG_IN_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'password' }
            })
        } else if(err && err.response && err.response.data.type && err.response.data.type === 'both') {
            dispatch({
                type: AUTH_ACTIONS.LOG_IN_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'both' }
            })
        } else {
            dispatch({
                type: AUTH_ACTIONS.LOG_IN_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'fullError' }
            })
        }
    }

    dispatch({
        type: AUTH_ACTIONS.STOP_LOADING,
        payload: { loading: false }
    })
}



export const register = ({ email, password, username, onSuccess }: {  email: string, password: string, username: string, onSuccess: (param: string) => void }) => async (dispatch: any) => {
    dispatch({
        type: AUTH_ACTIONS.REGISTER_START,
        payload: { loading: true }
    })

    const data = { email, password, username }

    try {
        const result = (await axios.post(`${server}/api/authentication/register`, data, { withCredentials: true })).data

        dispatch({
            type: AUTH_ACTIONS.REGISTER_SUCCESS,
            payload: { loading: false, uniqueUrl: result.uniqueParam }
        })

        dispatch({
            type: AUTH_ACTIONS.REGISTER_END,
            payload: { loading: false }
        })

        return onSuccess(result.uniqueParam)
        
    } catch (err: any) {
        if(err && err.response && err.response.data.type && err.response.data.type === 'email') {
            dispatch({
                type: AUTH_ACTIONS.REGISTER_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'email' }
            })
        } else if(err && err.response && err.response.data.type && err.response.data.type === 'password') {
            dispatch({
                type: AUTH_ACTIONS.REGISTER_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'password' }
            })
        } else if(err && err.response && err.response.data.type && err.response.data.type === 'username') {
            dispatch({
                type: AUTH_ACTIONS.REGISTER_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'username' }
            })
        } else {
            dispatch({
                type: AUTH_ACTIONS.REGISTER_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'fullError' }
            })
        }
    }

    dispatch({
        type: AUTH_ACTIONS.REGISTER_END,
        payload: { loading: false }
    })
}



export const codeRegister = ({ code, onSuccess }: { code: string, onSuccess: () => void }) => async (dispatch: any) => {
    dispatch({
        type: AUTH_ACTIONS.CODE_REGISTER_START,
        payload: { loading: true }
    })


    try {
        await axios.post(`${server}/api/authentication/register/complete`, { code }, { withCredentials: true })

        dispatch({
            type: AUTH_ACTIONS.CODE_REGISTER_SUCCESS,
            payload: { loading: false, loggedIn: true }
        })

        dispatch({
            type: AUTH_ACTIONS.CODE_REGISTER_END,
            payload: { loading: false }
        })

        return onSuccess()
        
    } catch (err: any) {
        if(err && err.response && err.response.data.type && err.response.data.type === 'code') {
            dispatch({
                type: AUTH_ACTIONS.CODE_REGISTER_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'code' }
            })
        } else {
            dispatch({
                type: AUTH_ACTIONS.CODE_REGISTER_FAIL,
                payload: { loading: false, error: err.response.data.message, name: 'fullError' }
            })
        }
    }

    dispatch({
        type: AUTH_ACTIONS.CODE_REGISTER_END,
        payload: { loading: false }
    })
}



export const forgotPassword = ({ email, onSuccess }: { email: string, onSuccess: () => void }) => async (dispatch: any) => {
    dispatch({
        type: AUTH_ACTIONS.FP_START
    })

    try {
        await axios.post(`${server}/api/authentication/forgot-password`, { email }, { withCredentials: true })

        dispatch({
            type: AUTH_ACTIONS.FP_SUCCESS
        })
        
        return onSuccess()
    } catch (err: any) {
        dispatch({
            type: AUTH_ACTIONS.FP_FAIL,
            payload: { error: err.response.data.message, name: 'email' }
        })
    }

    dispatch({
        type: AUTH_ACTIONS.FP_END
    })
}


export const completeForgotPassword = ({ password, confirmPassword, unique_url, onSuccess, onPageFail }: { password: string, confirmPassword: string, unique_url: string, onSuccess: () => void, onPageFail: () => void }) => async (dispatch: any) => {
    dispatch({
        type: AUTH_ACTIONS.FP_START
    })

    try {
        await axios.post(`${server}/api/authentication/forgot-password/change/${unique_url}`, { password, confirmPassword }, { withCredentials: true })

        dispatch({
            type: AUTH_ACTIONS.FP_SUCCESS
        })

        return onSuccess()
    } catch (err: any) {
        if(err && err.response && err.response.data.type && err.response.data.type === 'password') {
            dispatch({
                type: AUTH_ACTIONS.FP_FAIL,
                payload: { error: err.response.data.message, name: 'password' }
            })
        } else if(err && err.response && err.response.data.type && err.response.data.type === 'confirmPassword') {
            dispatch({
                type: AUTH_ACTIONS.FP_FAIL,
                payload: { error: err.response.data.message, name: 'confirmPassword' }
            })
        }  else if(err && err.response && err.response.data.type && err.response.data.type === 'page') {
            dispatch({
                type: AUTH_ACTIONS.FP_END
            })

            return onPageFail()
        } else {
            dispatch({
                type: AUTH_ACTIONS.FP_FAIL,
                payload: { error: err.response.data.message, name: 'fullError' }
            })
        }
    }

    dispatch({
        type: AUTH_ACTIONS.FP_END
    })
}