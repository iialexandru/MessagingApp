import type { FC, Dispatch, SetStateAction } from 'react';

import styles from '../../../styles/scss/Home/Conversation/MessSection.module.scss';

import { Section } from '@typings'


interface Props {
    setSection: Dispatch<SetStateAction<Section>>;
}


const MessSection: FC<Props> = ({ setSection }) => {

    return (
        <div onClick={() => setSection('Messages')} className={styles.section}>
            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985701/MessagingApp/man_5-512_esb1fi.webp' width={40} height={40} alt='Friend' />

            <div className={styles.info}>
                <span id='name'>Alex Alex AlexAlexAlexAlexAlexAlexAlexAlex</span>
                <span id='message'>Lorem ipsum dolor sit amet, consectetur adipis</span>
            </div>
        </div>
    )
}

export default MessSection;