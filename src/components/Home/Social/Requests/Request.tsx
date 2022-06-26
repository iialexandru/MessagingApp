import type { FC } from 'react';

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';


interface Props {
    name: string;
}


const Request: FC<Props> = ({ name }) => {

    return (
        <div className={styles.value}>
            <span>{name}</span>

            <div className={styles.buttons}>
                <button id='accept'>Accept</button>
                <button id='reject'>Reject</button>
            </div>
        </div>
    )
}

export default Request;