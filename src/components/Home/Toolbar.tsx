import type { FC, Dispatch, SetStateAction } from 'react';

import styles from '../../styles/scss/Home/Toolbar.module.scss';

type Section = 'Messages' | 'Friends' | 'Profile' | 'None'

interface Props {
    setSection: Dispatch<SetStateAction<Section>>;
    section: Section;
}


const Toolbar: FC<Props> = ({ setSection, section }) => {

    return (
        <div className={styles.container}>
            <div onClick={() => setSection('Messages')} className={`${section === 'Messages' ? styles.active : ''} ${styles.sec_opt}`}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655987198/MessagingApp/text-message-4641_ohkmqm.svg' width={30} height={30} alt='Messages' />
            </div>

            <div onClick={() => setSection('Friends')} className={`${section === 'Friends' ? styles.active : ''} ${styles.sec_opt}`}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655987227/MessagingApp/user-251_rovsr3.svg' width={30} height={30} alt='Messages' />
            </div>

            <div onClick={() => setSection('Profile')} className={`${section === 'Profile' ? styles.active : ''} ${styles.sec_opt}`}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655987542/MessagingApp/user-3296_qrcrcb.svg' width={30} height={30} alt='Messages' />
            </div>
        </div>
    )
}

export default Toolbar;