import { useState, useEffect, useRef } from 'react'
import type { Dispatch, SetStateAction } from 'react'
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


const MessageContainer = ({ conversationId, myEmail, myUsername, userId, setNewContainer, newContainer }: { conversationId: string, myEmail: string, myUsername: string, userId: string, newContainer: boolean, setNewContainer: Dispatch<SetStateAction<boolean>> }) => {
    const [ messages, setMessages ] = useState<TextMessage[]>([])
    const [ peopleIds, setPeopleIds ] = useState<any>([])
    const [ total, setTotal ] = useState(0)

    const scrollRef = useRef<any>(null)
    const [ skip, setSkip ] = useState(0)

    const [ loading, setLoading ] = useState(false)
    const [ initialLoading, setInitialLoading ] = useState(false)
    const [ref, inView, entry] = useInView({
        threshold: 0.5
    })


    const [ renderFirstTime, setRenderFirstTime ] = useState(false)

    const scrollContainer = useRef<any>(null)

    const { socket } = useSocket({ userId })

    useEffect(() => {
        const getConversation = async () => {
            setTimeout(() => {
                scrollRef.current?.scrollIntoView()
            }, 0)

            setSkip(0)
            setInitialLoading(true)
            const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}?limit=${30}&skip=${0}`, { withCredentials: true })).data

            setMessages(result.messages.reverse())
            setPeopleIds(result.people.reverse())
            setTotal(result.total)

            setInitialLoading(false)
            setNewContainer(false)

            setTimeout(() => {
                scrollRef.current?.scrollIntoView()
            }, 0)
        }

        if(newContainer) {
            getConversation()
        }
        
        setLoading(false)
    }, [ conversationId, skip, newContainer, setNewContainer ])


    useEffect(() => {
        if(socket === null) return;

        socket.on('receive-message', (message: any) => {
            setMessages([ ...messages, message.message ])
            setTotal(total => total + 1)

            if(message.email === myEmail) {
                setTimeout(() => {
                    scrollRef.current?.scrollIntoView()
                }, 0)
            }
        })


        return () => {
            socket.off('receive-message')
        }
    }, [ socket, messages ])


    const [ activate, setActivate ] = useState(false)

    useEffect(() => {
        if(!inView || total <= messages.length || skip > total || loading || activate || !messages.length || initialLoading || newContainer || !renderFirstTime) return;
        
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
                scrollContainer.current?.scrollIntoView()
            }, 0)
            
            setTimeout(() => {
                setActivate(false)
            }, 2000)
        }

        getMoreMessages()

        return () => {
            source.cancel() 
        }
    }, [ inView, activate, loading, total, initialLoading, newContainer, renderFirstTime ])

    return (
        <div className={styles.container}>

            <div className={styles.messages_container}>
                {(!loading && total >= messages.length && skip < total && !activate && messages.length && !initialLoading && renderFirstTime) ? <div ref={ref}></div> : <></> }
                {loading && 
                    <div className={styles.loader_container}>
                        <div className={styles.loader}></div>
                        <span>Loading...</span>
                    </div>
                }
                {(messages.length > 0 && !initialLoading) ?
                    <>
                        {messages.map((message: TextMessage, key: number) => {
                            if(key === 29 && messages.length === 30 && !renderFirstTime) {
                                setTimeout(() => setRenderFirstTime(true), 0)
                            }

                            return (
                                <div key={key} ref={(key === 29 && skip > 0) ? scrollContainer : null}>
                                    <Message key={key} index={myEmail === message.senderEmail ? 2 : 1} text={message.text} date={message.date} senderEmail={message.senderEmail} media={message.media ? message.media : ''} />
                                </div>
                            )
                        })}
                    </>
                
                : 
                <>
                    {initialLoading &&
                        <div className={styles.skeleton_container}>
                            <div className={styles.skeleton_message}></div>
                            <div className={styles.skeleton_message}></div>
                            <div className={styles.skeleton_message}></div>
                            <div className={styles.skeleton_message}></div>
                            <div className={styles.skeleton_message}></div>
                            <div className={styles.skeleton_message}></div>
                            <div className={styles.skeleton_message}></div>
                            <div className={styles.skeleton_message}></div>
                            <div className={styles.skeleton_message}></div>
                        </div>
                    }
                </>
                }
                <div ref={scrollRef}></div>
            </div>
            <CreateMessage socket={socket} userId={userId} conversationId={conversationId} />
        </div>
    )
}

export default MessageContainer;