import { useState, useEffect, useRef } from 'react'
import { TextMessage } from '@typings'
import { io } from 'socket.io-client'
import axios from 'axios'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss'
import Message from './Message'
import CreateMessage from './CreateMessage'
import { server } from '../../../config/index'


const MessageContainer = ({ conversationId, myEmail, myUsername, userId }: { conversationId: string, myEmail: string, myUsername: string, userId: string }) => {
    const [ messages, setMessages ] = useState<TextMessage[]>([])
    const [ peopleIds, setPeopleIds ] = useState([])
    const [ refreshConv, setRefreshConv ] = useState(false)
    const scrollRef = useRef<any>(null)
    
    useEffect(() => {
        const getConversation = async () => {
            const result = (await axios.get(`${server}/api/conversation/show-conversation/${conversationId}`, { withCredentials: true })).data

            setMessages(result.conversation.messages)
            setPeopleIds(result.conversation.people)

            setTimeout(() => {
                scrollRef.current?.scrollIntoView()
            }, 0)
        }

        getConversation()
    }, [ conversationId ])



    const [ socket, setSocket ] = useState<any>(null)

    useEffect(() => {
        const newSocket = io(`${server}`, { query: { id: userId } })
        setSocket(newSocket)

        // return () => {
            // newSocket.close()
        // }
    }, [ userId ])


    useEffect(() => {
        if(socket === null) return;

        socket.on('receive-message', (message: any) => {
            console.log({message});
            setMessages([ ...messages, message.message ])
        })

        
        setTimeout(() => {
            scrollRef.current?.scrollIntoView()
        }, 0)

        return () => {
            socket.off('receive-message')
        }
    }, [ messages, socket ])


    return (
        <div className={styles.container}>
            <div className={styles.messages_container}>
                {messages.length > 0 &&
                    messages.map((message: TextMessage, key: number) => {
                        return <Message key={key} index={myEmail === message.senderEmail ? 2 : 1} text={message.text} date={message.date} senderEmail={message.senderEmail} />
                })}
                <div ref={scrollRef}></div>
            </div>
            <CreateMessage socket={socket} userId={userId} scrollRef={scrollRef} setMessages={setMessages} messages={messages} conversationId={conversationId} setRefreshConv={setRefreshConv} refreshConv={refreshConv} peopleIds={peopleIds} />
        </div>
    )
}

export default MessageContainer;