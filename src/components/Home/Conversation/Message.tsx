import type { FC } from 'react';
import { useState } from 'react';
import { TextMessage } from '@typings';

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss';


const Message: FC<TextMessage> = ({ text, date, index }) => {
    const [ clicked, setClicked ] = useState(false)

    return (
        <div style={{ width: '100%', justifyContent: index === 1 ? 'flex-start' : 'flex-end', display: 'flex' }} onClick={() => setClicked(!clicked)}>
            <div style={{ backgroundColor: index === 1 ? '#D6BE9F' : '#D6D6D6' }} className={`${styles.message} ${clicked ? ( index === 1 ? styles.activated_message_creme : styles.activated_message_gray ) : ''}`}>
                <p>{text}</p>
                {clicked && <span className={`${styles.date} ${index === 1 ? styles.date_left : styles.date_right}`}>{date}</span> }
            </div>
        </div>
    )
}

export default Message;