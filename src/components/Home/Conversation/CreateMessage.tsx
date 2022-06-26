import type { FC, Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { format } from 'date-fns'
import { TextMessage } from '@typings'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss';

interface Props {
    setMessages: Dispatch<SetStateAction<TextMessage[]>>;
    messages: TextMessage[];
}


const CreateMessage: FC<Props> = ({ setMessages, messages }) => {
    const [ text, setText ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ start, setStart ] = useState(false)


    const sendMessage = (e: any) => {
        e.preventDefault()

        if(start || loading) return;

        setStart(true)

        if(text.length === 0) return;

        setLoading(true);

        setText('')
        setMessages([ ...messages, { index: 2, text, date: format(new Date(), 'dd-MM-yyyy')} ])
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