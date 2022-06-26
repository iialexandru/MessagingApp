import type { FC } from 'react';
import { TextMessage } from '@typings'

import styles from '../../../styles/scss/Home/Conversation/MessageContainer.module.scss'


const Message: FC<TextMessage> = ({ text, date, index }) => {

    return (
        <div style={{ width: '100%', justifyContent: index === 1 ? 'flex-start' : 'flex-end', display: 'flex' }}>
            <div className={styles.message} style={{ backgroundColor: index === 1 ? '#D6BE9F' : '#D6D6D6' }}>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Message;