import { useState } from 'react';

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import Friend from './Friend'


const Friends = () => {
    const [ search, setSearch ] = useState('')

    return (
        <div className={styles.friends_container}>
            <input value={search} onChange={e => setSearch(e.target.value)} />
            <div className={styles.values}>
                <Friend name={'asda'} />
            </div>
            {/* <div className={styles.none}>
                <h2>No results found</h2>
            </div> */}
        </div>
    )
}

export default Friends;