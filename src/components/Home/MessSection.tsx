import type { FC } from 'react';

import styles from '../../styles/scss/Home/MessSection.module.scss';


const MessSection = () => {

    return (
        <div className={styles.section}>
            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985701/MessagingApp/man_5-512_esb1fi.webp' width={40} height={40} alt='Friend' />

            <div className={styles.info}>
                <span id='name'>Alex Alex AlexAlexAlexAlexAlexAlexAlexAlex</span>
                <span id='message'>Lorem ipsum dolor sit amet, consectetur adipis</span>
            </div>
        </div>
    )
}

export default MessSection;