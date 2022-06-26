import type { FC } from 'react';
import { useState } from 'react'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';


interface Item {
    name: string;
}


const Friend: FC<Item> = ({ name }) => {
    const [ active, setActive ]  = useState<null | boolean>(null)

    return (
        <div className={styles.friend}>
            <div className={styles.up_list}>
                <span>{name}</span>
                <img onClick={() => setActive(!active)} style={{ transform: active ? 'rotate(0deg)' : 'rotate(180deg)' }} src='https://res.cloudinary.com/multimediarog/image/upload/v1656250600/MessagingApp/arrow-down-3101_5_rdoajz.svg' width={30} height={25} alt='Arrow' />
            </div>
            <div className={`${styles.down_list} ${(!active && active !== null) ? styles.close : ''}`}>
                <button id='block'>Block</button>
                <button id='unfriend'>Unfriend</button>
            </div>
        </div>
    )
}

export default Friend;