import type { FC } from 'react'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { TextMessage } from '@typings'
import { server } from '../config/index'


interface Props {
    children: React.ReactNode;
    conversationId: string;
    scrollRef: any;
    inView: boolean;
    socket: any;
}


export const ConversationMessages: FC<Props> = ({ conversationId, scrollRef, inView, socket } ,children) => {
    const [ messages, setMessages ] = useState<TextMessage[]>([])
    const [ peopleIds, setPeopleIds ] = useState<any>([])
    const [ total, setTotal ] = useState(0)

    const [ skip, setSkip ] = useState(0)

    const [ loading, setLoading ] = useState(false)


    useEffect(() => {
        if(socket === null) return;

        socket.on('receive-message', (message: any) => {
            setMessages([ ...messages, message.message ])
            setTotal(total => total + 1)
        })

        
        setTimeout(() => {
            scrollRef.current?.scrollIntoView()
        }, 0)

        return () => {
            socket.off('receive-message')
        }
    }, [ socket, messages ])


    useEffect(() => {
        const getConversation = async () => {
            setSkip(0)
            setLoading(true)
            const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${30}&skip=${0}`, { withCredentials: true })).data

            setMessages(result.messages.reverse())
            setPeopleIds(result.people.reverse())
            setTotal(result.total)

            setLoading(false)

            setTimeout(() => {
                scrollRef.current?.scrollIntoView()
            }, 0)
        }

        getConversation()
        
        setLoading(false)
    }, [ conversationId ])





    const [ activate, setActivate ] = useState(false)

    useEffect(() => {
        if(!inView || total <= messages.length || skip > total || loading || activate) return;
        
        const source = axios.CancelToken.source()
        const getMoreMessages = async () => {
            const _skip = skip + 30 
            setActivate(true)
            setLoading(true)
            setSkip(skip => skip + 30)  
            const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${30}&skip=${_skip}`, { withCredentials: true })).data
            
            setMessages([ ...result.messages.reverse(), ...messages ])
            setPeopleIds([ ...result.people.reverse(), ...peopleIds ])
            setLoading(false)
            
            
            setTimeout(() => {
                setActivate(false)
            }, 2000)
        }

        getMoreMessages()

        return () => {
            source.cancel() 
        }
    }, [ inView, activate, loading, total ])


    const Component = children

    return <Component messages={messages} total={total} skip={skip} activate={activate} loading={loading} />
}