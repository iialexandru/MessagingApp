import { useState, useEffect, useRef, useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { TextMessage } from '@typings'
import { connect } from 'react-redux'
import axios from 'axios'
import { useSocket } from '../../../hooks/useSocket'
import { useInView } from 'react-intersection-observer'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss'
import Message from './Message' 
import CreateMessage from './CreateMessage'
import { getInitialMessages, getPreviousMessages, receiveMessage, lastMessage, seeMessage, addNotReadyMessage, deleteNotReadyMessage } from '../../../actions/conversationActions'


const MessageContainer = ({ addNotReadyMessage, nrMessages, nrMessagesLoadings, globalConversationId, conversationId, myEmail, myUsername, userId, setNewContainer, newContainer, _messages, _total, getInitialMessages, getPreviousMessages, seeMessage, scrollRef, lastMessages, deleteNotReadyMessage }: { deleteNotReadyMessage: any, nrMessages: any, nrMessagesLoadings: any, lastMessages: any, scrollRef: any, globalConversationId: string, seeMessage: any, getInitialMessages: any, getPreviousMessages: any,_messages: any, _total: any, conversationId: string, myEmail: string, myUsername: string, userId: string, newContainer: boolean, setNewContainer: Dispatch<SetStateAction<boolean>>, addNotReadyMessage: any }) => {
    const messages: any = useMemo<any>(() => _messages[conversationId] ? _messages[conversationId] : [], [ conversationId, _messages ])
    const total: any = useMemo<any>(() => _total[conversationId] ? _total[conversationId] : 0, [ conversationId, _total ])

    const alreadyUnseenRef = useRef<any>(null)


    const [ skip, setSkip ] = useState(0)


    const [ loading, setLoading ] = useState(false)
    const [ initialLoading, setInitialLoading ] = useState(false)

    const [ref, inView, entry] = useInView({
        threshold: 0.5
    })


    const [ altRef, altInView ] = useInView({
        threshold: 0.9
    })
    
    const socket = useSocket()
    
    console.log(altInView && conversationId === globalConversationId && messages[messages.length - 1] && !(messages[messages.length - 1].seen.includes(userId)))
    useEffect(() => {
        if(altInView && conversationId === globalConversationId && messages[messages.length - 1] && !(messages[messages.length - 1].seen.includes(userId))) {
            console.log('yes')
            seeMessage({ conversationId, messageId: messages[messages.length - 1]._id, seenEmail: myEmail, messageSeenByOther: socket!.messageSeenByOther })
        }
    }, [ altInView, globalConversationId, conversationId, seeMessage, messages ])



    const [ renderFirstTime, setRenderFirstTime ] = useState(false)

    const scrollContainer = useRef<any>(null)


    useEffect(() => {
        const getConversation = async () => {
            setTimeout(() => {
                scrollRef.current?.scrollIntoView()
            }, 0)


            const onSuccess = () => {
                if(lastMessages[conversationId].totalUnseen > 0) {
                    setTimeout(() => {
                        alreadyUnseenRef.current?.scrollIntoView()
                    }, 0)
                } else {
                    setTimeout(() => {
                        scrollRef.current?.scrollIntoView()
                    }, 0)
                }
            }



            const onGettingMessages = () => {
                setInitialLoading(false)
                setNewContainer(false)
    
            }

            if(!(messages.length > 0) && lastMessages[conversationId]) {
                setSkip(0)
                setInitialLoading(true)

                getInitialMessages({ conversationId, onSuccess, onGettingMessages, totalUnseen: lastMessages[conversationId].totalUnseen })
            }
      
        }

        if(newContainer) {
            getConversation()
        }
        
        setLoading(false)
    }, [ conversationId, skip, newContainer, setNewContainer, getInitialMessages, initialLoading ])


    
    const [ activate, setActivate ] = useState(false)


    useEffect(() => {
        if(!inView || total <= messages.length || skip > total || loading || activate || !messages.length || initialLoading || newContainer || !renderFirstTime) return;
        
        const source = axios.CancelToken.source()

        const getMoreMessages = async () => {
            const _skip = skip + 100 
            setActivate(true)
            setLoading(true)
            setSkip(skip => skip + 100)  

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

    return (
        <div className={styles.container}>

            <div className={styles.messages_container}>
                {(!loading && total >= messages.length && skip < total && !activate && messages.length && !initialLoading && renderFirstTime) ? <div ref={ref}>asdhajsdv</div> : <></> }
                {loading && 
                    <div className={styles.loader_container}>
                        <div className={styles.loader}></div>
                    </div>
                }
                {(messages && messages.length > 0 && !initialLoading) ?
                    <>
                        {messages.map((message: TextMessage, key: number) => {
                            if(key === messages.length - 1 && !renderFirstTime) {
                                setTimeout(() => setRenderFirstTime(true), 0)
                            }
                            
                            let lastIndex = -1
                            messages.forEach((m: any, key: number) => { if(m.senderEmail !== myEmail) { lastIndex = key } })

                            return (
                                <div key={key} ref={(key === 99 && skip > 0) ? scrollContainer : ((key === lastIndex && !(message.seen!.includes(userId))) ? altRef : ((key === 99 && lastMessages[conversationId].totalUnseen > 0) ? alreadyUnseenRef : null))}>
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
                {(nrMessagesLoadings[conversationId] && nrMessagesLoadings[conversationId][0] && nrMessagesLoadings[conversationId][0].active) ? 
                    <div className={styles.status_message}>
                        <img src='https://res.cloudinary.com/multimediarog/image/upload/v1657179756/MessagingApp/Spinner-1s-200px_4_ds6f4r.svg' width={30} height={30} alt='SVG' />
                        <span>Loading message</span>
                    </div>
                :
                    (messages && messages[messages.length - 1] && messages[messages.length - 1].senderEmail === myEmail && !lastMessages[conversationId].seenByOther) ?
                        <div className={styles.status_message}>
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1657179865/MessagingApp/send-4006_7_ny9rbr.svg' width={15} height={15} alt='Sent' />
                            <span>Sent</span>
                        </div>
                    : (messages && messages[messages.length - 1] && messages[messages.length - 1].senderEmail === myEmail && lastMessages[conversationId].seenByOther) &&
                        <div className={styles.status_message}>
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1657193483/MessagingApp/check-mark-3279_1_ecanzu.svg' width={15} height={15} alt='Seen' />
                            <span>Seen</span>
                        </div>
                }
                <div ref={scrollRef}></div>
            </div>
            <CreateMessage nrMessages={nrMessages[conversationId]} userId={userId} conversationId={conversationId} addNotReadyMessage={addNotReadyMessage} myEmail={myEmail} scrollRef={scrollRef} />
        </div>
    )
}

export default connect((state: any) => ({ _messages: state.conversation.messages, _total: state.conversation.total, lastMessages: state.conversation.lastMessages, nrMessages: state.conversation.nrMessages, nrMessagesLoadings: state.conversation.nrMessagesLoadings }), { getInitialMessages, getPreviousMessages, receiveMessage, lastMessage, seeMessage, addNotReadyMessage, deleteNotReadyMessage })(MessageContainer);