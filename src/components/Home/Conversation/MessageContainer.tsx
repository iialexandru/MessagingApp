import { useState, useEffect, useRef } from 'react'
import { TextMessage } from '@typings'
import { io } from 'socket.io-client'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useInView } from 'react-intersection-observer'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss'
import Message from './Message'
import CreateMessage from './CreateMessage'
import { server } from '../../../config/index'
import { useSocket } from '../../../hooks/useSocket'


const MessageContainer = ({ conversationId, myEmail, myUsername, userId }: { conversationId: string, myEmail: string, myUsername: string, userId: string }) => {
    const [ messages, setMessages ] = useState<TextMessage[]>([])
    const [ peopleIds, setPeopleIds ] = useState<any>([])
    const [ total, setTotal ] = useState(0)
    const [ refreshConv, setRefreshConv ] = useState(false)
    const scrollRef = useRef<any>(null)
    const [ skip, setSkip ] = useState(0)

    const [ loading, setLoading ] = useState(false)
    const [ref, inView, entry] = useInView({
        threshold: 0.5
    })


    const { socket } = useSocket({ userId })


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

    console.log(messages)

    return (
        <div className={styles.container}>
            <div className={styles.messages_container}>
                {(!loading && total >= messages.length && skip < total && !activate) ? <div ref={ref}></div> : <></> }
                {messages.length > 0 &&
                    <>
                        {messages.map((message: TextMessage, key: number, arr: any) => {
                            return (
                                <div key={key}>
                                    <Message key={key} index={myEmail === message.senderEmail ? 2 : 1} text={message.text} date={message.date} senderEmail={message.senderEmail} />
                                </div>
                            )
                        })}
                    </>
                }
                <div ref={scrollRef}></div>
            </div>
            <CreateMessage socket={socket} userId={userId} scrollRef={scrollRef} setMessages={setMessages} messages={messages} conversationId={conversationId} setRefreshConv={setRefreshConv} refreshConv={refreshConv} peopleIds={peopleIds} />
        </div>
    )
}

export default MessageContainer;