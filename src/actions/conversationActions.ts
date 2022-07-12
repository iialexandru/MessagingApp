import axios from 'axios'

import { CONVERSATION_ACTIONS } from '../reducers/conversationReducer'
import { server } from '../config/index'


export const getInitialMessages = ({ conversationId, onSuccess, onGettingMessages, totalUnseen }: { totalUnseen: number, onGettingMessages: () => void, conversationId: string, onSuccess: () => void }) => async (dispatch: any) => {
    try {
        const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${100}&skip=${0}&add=${totalUnseen || 0}`, { withCredentials: true })).data

        dispatch({
            type: CONVERSATION_ACTIONS.GET_INITIAL_MESSAGES,
            payload: { id: conversationId, messages: result.messages.reverse(), total: result.total }
        })

        onSuccess()
    } catch (err) {
        console.log(err)
    }

    onGettingMessages()
}


export const getPreviousMessages = ({ conversationId, skip, onFinish }: { conversationId: string, skip: number, onFinish: () => void }) => async (dispatch: any) => {
    try {
        const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${100}&skip=${skip}`, { withCredentials: true })).data

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


export const receiveMessage = ({ conversationId, message, email, userId, onMyMessage, id, finished, senderEmail }: { senderEmail: string, id: number, finished: boolean, onMyMessage: ({ senderEmail }: { senderEmail: string }) => void, conversationId: string, message: any, email: string, userId: string }) => async (dispatch: any) => {
    try {
        console.log(message)
        dispatch({
            type: CONVERSATION_ACTIONS.RECEIVE_NEW_MESSAGE,
            payload: { id: conversationId, newMessage: message, userId, email }
        })

        onMyMessage({ senderEmail })

        if(finished) {
            dispatch({
                type: CONVERSATION_ACTIONS.DELETE_NR_MESSAGE,
                payload: { id, conversationId }
            })
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


export const seeMessage = ({ conversationId, messageId, seenEmail, messageSeenByOther }: { messageSeenByOther: any,  messageId: string, conversationId: string, seenEmail: string }) => async (dispatch: any) => {
    try {
        dispatch({
            type: CONVERSATION_ACTIONS.SEEN_LAST_MESSAGE,
            payload: { id: conversationId }
        })

        await axios.post(`${server}/api/conversation/seen-message/${messageId}/${conversationId}`, {}, { withCredentials: true })

        const result = (await axios.get(`${server}/api/conversation/last-message`, { withCredentials: true })).data

        dispatch({
            type: CONVERSATION_ACTIONS.LAST_MESSAGE,
            payload: { data: result.newConversations }
        })

        messageSeenByOther({ conversationId, seenEmail })
    } catch (err) {
        console.log(err)
    }
}


export const seenMessageByOther = ({ conversationId }: { conversationId: string }) => async (dispatch: any) => {
    try {
        dispatch({
            type: CONVERSATION_ACTIONS.OTHER_SEEN_LAST_MESSAGE,
            payload: { conversationId }
        })
    } catch (err) {
        console.log(err)
    }
}


export const addNotReadyMessage = ({ conversationId, id, text, date, media, email }: { conversationId: string, id: number, text: string, date: string, media: string, email: string }) => (dispatch: any) => {
    try {
        dispatch({
            type: CONVERSATION_ACTIONS.ADD_NR_MESSAGE,
            payload: { conversationId, id, text, date, media, email }
        })
    } catch (err) {
        console.log(err)
    }
}


export const deleteNotReadyMessage = ({ id, conversationId }: { id: number, conversationId: string }) => (dispatch: any) => {
    try {
        dispatch({
            type: CONVERSATION_ACTIONS.DELETE_NR_MESSAGE,
            payload: { id, conversationId }
        })
    } catch (err) {
        console.log(err)
    }
}


export const getConversations = ({ onFinish }: { onFinish: () => void }) => async (dispatch: any) => {
    try {
        const result = (await axios.get(`${server}/api/conversation/show-conversations`, { withCredentials: true })).data

        dispatch({
            type: CONVERSATION_ACTIONS.GET_CONVERSATIONS,
            payload: { conversations: result.conversations }
        })
    } catch (err) {
        console.log(err)
    }

    onFinish()
}


export const addConversation = ({ conversation, onAdded }: { conversation: any, onAdded: any }) => (dispatch: any) => {
    try { 
        dispatch({
            type: CONVERSATION_ACTIONS.ADD_CONVERSATION,
            payload: { conversation }
        })

        if(Boolean(onAdded)) {
            onAdded()
        }
    } catch (err) {
        console.log(err)
    }
}  

export const removeConversation = ({ conversationId, onSuccess }: { conversationId: string, onSuccess: () => void }) => (dispatch: any) => {
    try {
        dispatch({
            type: CONVERSATION_ACTIONS.REMOVE_CONVERSATION,
            payload: { conversationId }
        })

        if(onSuccess) {
            onSuccess()
        }
    } catch (err) {
         console.log(err)
    }
}