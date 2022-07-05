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


    const eventListeners = async ({ receiveMessage, email }: { receiveMessage: ({ conversationId, message, email }: { conversationId: string, message: string, email: string }) => void, email: string }) => {
        if(!socket) return;

        socket.on('receive-message', ({ message, conversationId }: { message: string, conversationId: string }) => {

            receiveMessage({ message, conversationId, email })
        })
    }

    const sendMessage = ({ text, date, conversationId, userId, files }: { text: string, date: string, conversationId: string, userId: string, files: string[] }) => {
        socket.emit('send-message', { text, date, conversationId, userId, files })
    }

    const unsubscribe = () => {
        setSocket(null)
    }

    return { eventListeners, subscribe, unsubscribe, sendMessage }
}
export const useSocket = singletonHook(init, useSocketInit)