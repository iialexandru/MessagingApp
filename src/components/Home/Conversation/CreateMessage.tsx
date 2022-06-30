import type { FC, Dispatch, SetStateAction } from 'react'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import axios from 'axios'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss';
import { TextMessage } from '@typings'
import { server } from '../../../config/index'


interface Props {
    setMessages: Dispatch<SetStateAction<TextMessage[]>>;
    setRefreshConv: Dispatch<SetStateAction<boolean>>;
    refreshConv: boolean;
    messages: TextMessage[];
    conversationId: string;
    scrollRef: any;
    userId: string;
    socket: any;
    peopleIds: any;
}


const CreateMessage: FC<Props> = ({ setMessages, messages, conversationId, setRefreshConv, refreshConv, scrollRef, userId, socket, peopleIds }) => {
    const [ text, setText ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ start, setStart ] = useState(false)

    const sendSocketMessage = (recipients: any, text: string, date: string, conversationId: string, userId: string) => {
        socket.emit('send-message', { recipients, text, date, conversationId, userId})
    }

    useEffect(() => {
        
    }, [ socket ])



    const sendMessage = async (e: any) => {
        e.preventDefault()

        const date = format(new Date(), 'dd-MM-yyyy')

        if(start || loading || !text.length) return;

        setStart(true)

        if(text.length === 0) return;

        setLoading(true);

        try {
            sendSocketMessage(peopleIds, text, date, conversationId, userId)
        } catch (err) {
            console.log(err)
        }

        setText('')
        setLoading(false)
        setStart(false)
    }

    return (
        <div className={styles.tooltext}>
            <input value={text} maxLength={1000} onChange={e => setText(e.target.value)} placeholder="Write a message..." onKeyDown={e => { if(e.key === 'Enter') { sendMessage(e) } }} />
            <div className={styles.send} onClick={e => sendMessage(e)}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1656149617/MessagingApp/send-4006_ebpjrw.svg' width={25} height={25} alt='Send' />
            </div>
        </div>
    )
}

export default CreateMessage;