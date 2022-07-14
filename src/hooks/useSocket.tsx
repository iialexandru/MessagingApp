import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { singletonHook } from 'react-singleton-hook'

import { server } from '../config/index'
import { addConversation } from 'actions/conversationActions'


const init = null


export const useSocketInit = () => {
    const [ socket, setSocket ] = useState<any>(init)
    const [ isSubscribed, setIsSubscribed ] = useState(false)

    const subscribe = ({ userId }: { userId: string }) => {
        if(!socket) {
            setSocket(io(`${server}`, { query: { id: userId } }))
        }
    }


    const eventListeners = async ({ receiveMessage, email, userId, seenMessageByOther, removeConversation, addConversation, conversationStatus }: { conversationStatus: any, addConversation: any, removeConversation: any, seenMessageByOther: any, userId: string, receiveMessage: any, email: string }) => {
        if(!socket) return;
        
        socket.on('receive-message', ({ message, conversationId, finished, id, senderEmail }: { id: number, senderEmail: string, message: string, conversationId: string, finished: boolean }) => {
            receiveMessage({ message, conversationId, email, senderEmail, userId, id, finished })
        })

        socket.on('receive-seen-message-by-other', ({ conversationId, senderEmail }: { conversationId: string, senderEmail: string }) => {
            if(senderEmail !== email) {
                seenMessageByOther({ conversationId })
            }
        })

        socket.on('remove-conversation', ({ conversationId }: { conversationId: string }) => {
            removeConversation({ conversationId })
        })
        
        socket.on('add-conversation', ({ conversation }: { conversation: string }) => {
            addConversation({ conversation })
        })
        
        socket.on('join-the-room', ({ conversationId }: { conversationId: string }) => {
            socket.emit('actually-join-the-room', { conversationId })
        })

        socket.on('update-conversation-status', ({ conversationId, convStatus }: { conversationId: string, convStatus: boolean }) => {
            conversationStatus({ conversationId, convStatus })
        })
    }
    
    const sendMessage = ({ text, date, conversationId, userId, files, id }: { id: number, text: string, date: string, conversationId: string, userId: string, files: string[] }) => {
        socket.emit('send-message', { text, date, conversationId, userId, files, id })
    }

    const messageSeenByOther = ({ conversationId, seenEmail }: { conversationId: string, seenEmail: string }) => {
        socket.emit('seen-message-by-other', { conversationId, seenEmail })
    }

    const addNewConversation = ({ conversation }: { conversation: any }) => {
        socket.emit('add-new-conversation', { conversation })
    }

    const removeConversation = ({ conversationId }: { conversationId: any }) => {
        socket.emit('removed-conversation', { conversationId })
    }
    
    const joinRoom = ({ conversation }: { conversation: any }) => {
        socket.emit('join-room', { conversationId: conversation._id, friends: conversation.peopleIds })
    }

    const sendConversationStatus = ({ conversationId, convStatus }: { conversationId: string, convStatus: boolean }) => {
        socket.emit('conversation-status', { conversationId, convStatus})
    }

    const unsubscribe = () => {
        setSocket(null)
        socket.disconnect()
    }

    return { eventListeners, subscribe, unsubscribe, sendMessage, messageSeenByOther, addNewConversation, removeConversation, joinRoom, sendConversationStatus }
}
export const useSocket = singletonHook(init, useSocketInit)