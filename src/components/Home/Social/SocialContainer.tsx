import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import styles from '../../../styles/scss/Home/Social/SocialContainer.module.scss';
import AddFriend from './AddFriend/AddFriend';
import Friends from './Friends/Friends';
import Requests from './Requests/Requests';


const SocialContainer = ({ setConversationId }: { setConversationId: Dispatch<SetStateAction<string | null>> }) => {
    const sections = [
        'https://res.cloudinary.com/multimediarog/image/upload/v1655987250/MessagingApp/user-251_lzpkgb.svg',
        'https://res.cloudinary.com/multimediarog/image/upload/v1656246252/MessagingApp/team-5701_1_uqv9wx.svg',
        'https://res.cloudinary.com/multimediarog/image/upload/v1656246498/MessagingApp/notification-bell-13081_xrqw4x.svg'
    ]

    const [ section, setSection ] = useState(0)
    return (

        <div className={styles.container}>
            <div className={styles.tools}>
                <img onClick={() => setSection(section => section - 1 < 0 ? 2 : section - 1)} id='arrow' src='https://res.cloudinary.com/multimediarog/image/upload/v1656156058/MessagingApp/arrow-854_xjndtn.svg' width={100} height={70} alt='left-arrow' />
                {sections.map((img: string, key: number) => {
                    return key === section && <img key={key} src={img} width={50} height={50} alt='Add/reject friends' />
                })}
                <img onClick={() => setSection(section => section + 1 > 2 ? 0 : section + 1)} id='arrow' src='https://res.cloudinary.com/multimediarog/image/upload/v1656156060/MessagingApp/share-arrow-855_gbwwyg.svg' width={100} height={70} alt='right-arrow' />
            </div>
            {section === 0 && <AddFriend /> }
            {section === 1 && <Friends setConversationId={setConversationId} /> }
            {section === 2 && <Requests /> }
        </div>
    )
}

export default SocialContainer;