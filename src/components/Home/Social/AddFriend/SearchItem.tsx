import type { FC } from 'react';

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';


interface Item {
    email: string;
    name: string;
}


const SearchItem: FC<Item> = ({ email, name }) => {

    return (
        <div className={styles.value}>
            <span>{email}</span>
            <span>{name}</span>
            <button>Add</button>
        </div>
    )
}

export default SearchItem;