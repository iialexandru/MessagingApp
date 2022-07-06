import type { FC, Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie'
import parse from 'html-react-parser'

import styles from '../../../styles/scss/Home/Conversation/MessSection.module.scss';

import { Section } from '@typings'


interface Props {
    setSection: Dispatch<SetStateAction<Section>>;
    myUsername: string;
    myEmail: string;
    person?: any;
    message: string;
    conversationId: string;
    setConversationId: Dispatch<SetStateAction<any>>
    setNewContainer: Dispatch<SetStateAction<boolean>>
    globalConversationId: string | null;
    seenMessage: boolean;
    totalUnseen: number;
}


const MessSection: FC<Props> = ({ setSection, person, message, conversationId, setConversationId, setNewContainer, globalConversationId, seenMessage, totalUnseen }) => {
    return (
        <div onClick={() => { if(conversationId !== globalConversationId) { setNewContainer(true); setConversationId(conversationId); setSection('Messages') } } } className={`${conversationId === globalConversationId ? styles.active_section : ''} ${styles.section}`}>
            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985701/MessagingApp/man_5-512_esb1fi.webp' width={40} height={40} alt='Friend' />

            <div className={styles.info}>
                <span id='name'>{person.username}</span>
                <span style={{ color: totalUnseen > 0 ? '#37B34A' : '', fontWeight: totalUnseen > 0 ? '600' : '', whiteSpace: 'nowrap', display: 'flex', fontSize: 'clamp(.9rem, 2.5vw, 1rem)', gap: '1em', alignItems: 'center' }} id='message'>{totalUnseen > 0 ? totalUnseen : ''} {parse(message)}</span>
            </div>
        </div>
    )
}

export default MessSection;