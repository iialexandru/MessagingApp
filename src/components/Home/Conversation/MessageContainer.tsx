import { useState, useEffect, useRef, useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { TextMessage } from '@typings'
import { connect } from 'react-redux'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useInView } from 'react-intersection-observer'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss'
import Message from './Message' 
import CreateMessage from './CreateMessage'
import { server } from '../../../config/index'
import { useSocket } from '../../../hooks/useSocket'
import { getInitialMessages, getPreviousMessages, receiveMessage } from '../../../actions/conversationActions'


const MessageContainer = ({ conversationId, myEmail, myUsername, userId, setNewContainer, newContainer, _messages, _total, getInitialMessages, getPreviousMessages}: { getInitialMessages: any, getPreviousMessages: any,_messages: any, _total: any, conversationId: string, myEmail: string, myUsername: string, userId: string, newContainer: boolean, setNewContainer: Dispatch<SetStateAction<boolean>> }) => {
    const messages: any = useMemo<any>(() => _messages[conversationId] ? _messages[conversationId] : [], [ conversationId, _messages ])
    const total: any = useMemo<any>(() => _total[conversationId] ? _total[conversationId] : 0, [ conversationId, _total ])


    const scrollRef = useRef<any>(null)
    const [ skip, setSkip ] = useState(0)

    const [ loading, setLoading ] = useState(false)
    const [ initialLoading, setInitialLoading ] = useState(false)

    const [ref, inView, entry] = useInView({
        threshold: 0.5
    })

    const [ renderFirstTime, setRenderFirstTime ] = useState(false)

    const scrollContainer = useRef<any>(null)



    useEffect(() => {
        const getConversation = async () => {
            setTimeout(() => {
                scrollRef.current?.scrollIntoView()
            }, 0)

            const onSuccess = () => {
                setTimeout(() => {
                    scrollRef.current?.scrollIntoView()
                }, 0)
            }

            setSkip(0)
            setInitialLoading(true)

            if(!(messages.length > 0)) {
                getInitialMessages({ conversationId, onSuccess })
            }


            setInitialLoading(false)
            setNewContainer(false)

      
        }

        if(newContainer) {
            getConversation()
        }
        
        setLoading(false)
    }, [ conversationId, skip, newContainer, setNewContainer, getInitialMessages ])



    // useEffect(() => {
    //     if(socket === null) return;

    //     socket.on('receive-message', (message: any) => {
    //         setMessages([ ...messages, message.message ])
    //         setTotal(total => total + 1)

    //         if(message.email === myEmail) {
    //             setTimeout(() => {
    //                 scrollRef.current?.scrollIntoView()
    //             }, 0)
    //         }
    //     })


    //     return () => {
    //         socket.off('receive-message')
    //     }
    // }, [ socket, messages ])


    const [ activate, setActivate ] = useState(false)

    
    useEffect(() => {
        if(!inView || total <= messages.length || skip > total || loading || activate || !messages.length || initialLoading || newContainer || !renderFirstTime) return;
        
        const source = axios.CancelToken.source()

        const getMoreMessages = async () => {
            const _skip = skip + 30 
            setActivate(true)
            setLoading(true)
            setSkip(skip => skip + 30)  

            const onFinish = () => {
                setLoading(false)
            

                setTimeout(() => {
                    scrollContainer.current?.scrollIntoView()
                }, 0)
                
                setTimeout(() => {
                    setActivate(false)
                }, 2000)
            }
            
            getPreviousMessages({ conversationId, skip: _skip, onFinish })
        }

        getMoreMessages()

        return () => {
            source.cancel() 
        }
    }, [ inView, activate, loading, _total, initialLoading, newContainer, renderFirstTime, getPreviousMessages ])

    console.log(_messages)

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
                {(messages && messages.length > 0 && !initialLoading) ?
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
            <CreateMessage userId={userId} conversationId={conversationId} />
        </div>
    )
}

export default connect((state: any) => ({ _messages: state.conversation.messages, _total: state.conversation.total }), { getInitialMessages, getPreviousMessages, receiveMessage })(MessageContainer);