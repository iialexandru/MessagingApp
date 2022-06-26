import type { FC } from 'react';

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';


interface Item {
    email: string;
}


const SearchItem: FC<Item> = ({ email }) => {

    return (
        <div className={styles.value}>
            <span>{email}</span>
            <button>Add</button>
        </div>
    )
}

export default SearchItem;