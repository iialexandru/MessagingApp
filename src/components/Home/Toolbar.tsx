import type { FC, Dispatch, SetStateAction } from 'react';

import styles from '../../styles/scss/Home/Toolbar.module.scss';

import { Section } from '@typings'


interface Props {
    setSection: Dispatch<SetStateAction<Section>>;
    setNewContainer: Dispatch<SetStateAction<boolean>>;
    section: Section;
}


const Toolbar: FC<Props> = ({ setSection, section, setNewContainer }) => {

    return (
        <div className={styles.container}>
            <div onClick={() => { setNewContainer(true); setSection('Messages');  } } className={`${section === 'Messages' ? styles.active : ''} ${styles.sec_opt}`}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655987198/MessagingApp/text-message-4641_ohkmqm.svg' width={30} height={30} alt='Messages' />
            </div>

            <div onClick={() => setSection('Social')} className={`${section === 'Social' ? styles.active : ''} ${styles.sec_opt}`}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655987227/MessagingApp/user-251_rovsr3.svg' width={30} height={30} alt='Messages' />
            </div>
        </div>
    )
}

export default Toolbar;