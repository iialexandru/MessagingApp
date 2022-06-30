import type { FC, Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie'

import styles from '../../../styles/scss/Home/Conversation/MessSection.module.scss';

import { Section } from '@typings'


interface Props {
    setSection: Dispatch<SetStateAction<Section>>;
    myUsername: string;
    myEmail: string;
    person?: any;
    message: string;
    conversationId: string;
}


const MessSection: FC<Props> = ({ setSection, person, message, conversationId }) => {

    return (
        <div onClick={() => { Cookies.set('conversation', conversationId); setSection('Messages') } } className={styles.section}>
            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985701/MessagingApp/man_5-512_esb1fi.webp' width={40} height={40} alt='Friend' />

            <div className={styles.info}>
                <span id='name'>{person.username}</span>
                <span id='message'>{message}</span>
            </div>
        </div>
    )
}

export default MessSection;