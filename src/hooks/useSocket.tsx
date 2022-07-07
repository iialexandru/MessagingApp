import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { singletonHook } from 'react-singleton-hook'

import { server } from '../config/index'


const init = null


export const useSocketInit = () => {
    const [ socket, setSocket ] = useState<any>(init)
    const [ isSubscribed, setIsSubscribed ] = useState(false)

    const subscribe = ({ userId }: { userId: string }) => {
        if(!socket) {
            setSocket(io(`${server}`, { query: { id: userId } }))
        }
    }


    const eventListeners = async ({ receiveMessage, email, userId, seenMessageByOther }: { seenMessageByOther: any, userId: string, receiveMessage: any, email: string }) => {
        if(!socket) return;
        
        socket.on('receive-message', ({ message, conversationId, finished, id, senderEmail }: { id: number, senderEmail: string, message: string, conversationId: string, finished: boolean }) => {
            receiveMessage({ message, conversationId, email, senderEmail, userId, id, finished })
        })

        socket.on('receive-seen-message-by-other', ({ conversationId, senderEmail }: { conversationId: string, senderEmail: string }) => {
            if(senderEmail !== email) {
                seenMessageByOther({ conversationId })
            }
        })
    }
    
    const sendMessage = ({ text, date, conversationId, userId, files, id }: { id: number, text: string, date: string, conversationId: string, userId: string, files: string[] }) => {
        socket.emit('send-message', { text, date, conversationId, userId, files, id })
    }

    const messageSeenByOther = ({ conversationId, seenEmail }: { conversationId: string, seenEmail: string }) => {
        socket.emit('seen-message-by-other', { conversationId, seenEmail })
    }

    const unsubscribe = () => {
        setSocket(null)
    }

    return { eventListeners, subscribe, unsubscribe, sendMessage, messageSeenByOther }
}
export const useSocket = singletonHook(init, useSocketInit)