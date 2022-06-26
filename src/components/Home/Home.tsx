import { useState } from 'react'

import styles from '../../styles/scss/Home/Home.module.scss';
import MessSection from './Conversation/MessSection'
import Toolbar from './Toolbar'
import MessageContainer from './Conversation/MessageContainer'
import SocialContainer from './Social/SocialContainer'

import { Section } from '@typings'


const Home = () => {
    const [ section, setSection ] = useState<Section>('None')
    const [ selected, setSelected ] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.mess_container}>
                <div className={styles.flex_list}>
                    <div className={styles.header}>
                        <div className={styles.headline}>
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985142/MessagingApp/Messages-icon_spndmi.png' width={35} height={35} alt='logo' />
                            <h2>Messager</h2>
                        </div>
                    </div>

                    <div className={styles.section_container}>
                        <MessSection setSection={setSection} />
                        <MessSection setSection={setSection} />
                        <MessSection setSection={setSection} />
                        <MessSection setSection={setSection} />
                    </div>
                </div>

                <div className={styles.replacer}>
                    <Toolbar setSection={setSection} section={section} />
                    {section === 'Messages' && <MessageContainer /> }
                    {section === 'Social' && <SocialContainer /> }
                </div>
            </div>
        </div>
    )
}

export default Home;