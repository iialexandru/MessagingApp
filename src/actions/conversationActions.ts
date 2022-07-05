import axios from 'axios'

import { CONVERSATION_ACTIONS } from '../reducers/conversationReducer'
import { server } from '../config/index'


export const getInitialMessages = ({ conversationId, onSuccess }: { conversationId: string, onSuccess: () => void }) => async (dispatch: any) => {
    try {
        const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${30}&skip=${0}`, { withCredentials: true })).data

        dispatch({
            type: CONVERSATION_ACTIONS.GET_INITIAL_MESSAGES,
            payload: { id: conversationId, messages: result.messages.reverse(), total: result.total }
        })

        onSuccess()
    } catch (err) {
        console.log(err)
    }
}



export const getPreviousMessages = ({ conversationId, skip, onFinish }: { conversationId: string, skip: number, onFinish: () => void }) => async (dispatch: any) => {
    try {
        const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${30}&skip=${skip}`, { withCredentials: true })).data

        dispatch({
            type: CONVERSATION_ACTIONS.GET_PREVIOUS_MESSAGES,
            payload: { id: conversationId, messages: result.messages.reverse() }
        })

        onFinish()

    } catch (err) {
        console.log(err)
    }

    onFinish()
}

export const receiveMessage = ({ conversationId, message, email }: { conversationId: string, message: any, email: string }) => async (dispatch: any) => {
    try {
        dispatch({
            type: CONVERSATION_ACTIONS.RECEIVE_NEW_MESSAGE,
            payload: { id: conversationId, newMessage: message }
        })

        if(message.senderEmail === email) {
            // onSent()
        }
    } catch (err) {
        console.log(err)
    }
}


export const lastMessage = () => async (dispatch: any) => {
    try {
        const result = (await axios.get(`${server}/api/conversation/last-message`, { withCredentials: true })).data

        dispatch({
            type: CONVERSATION_ACTIONS.LAST_MESSAGE,
            payload: { data: result.newConversations }
        })
    } catch (err) {
        console.log(err)
    }
}