import { useState } from 'react'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import SearchItem from './SearchItem';


const AddFriend = () => {
    const [ search, setSearch ] = useState('')

    return (
        <div className={styles.friends_container}>
            <input value={search} onChange={e => setSearch(e.target.value)} />
            {/* <div className={styles.values}>
                <SearchItem email={'asda'} />
            </div> */}
            <div className={styles.none}>
                <h2>No results found</h2>
            </div>
        </div>
    )
}

export default AddFriend;