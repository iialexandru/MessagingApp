import type { FC } from 'react';
import { useState } from 'react'
import { TextMessage } from '@typings'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss'
import Message from './Message'
import CreateMessage from './CreateMessage'


const MessageContainer = () => {
    const [ messages, setMessages ] = useState<TextMessage[]>([])

    return (
        <div className={styles.container}>
            <div className={styles.messages_container}>
                {messages.map((message: TextMessage, key: number) => {
                    return <Message key={key} index={message.index} text={message.text} date={message.date} />
                })}
            </div>
            <CreateMessage setMessages={setMessages} messages={messages} />
        </div>
    )
}

export default MessageContainer;