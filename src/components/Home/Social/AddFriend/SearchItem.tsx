import type { FC } from 'react';
import { useState } from 'react'
import { connect } from 'react-redux'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import { addFriend } from '../../../../actions/socialActions'


interface Item {
    email: string;
    name: string;
    onSuccess: () => void;
    addFriend: (dispatch: any) => void;
}


const SearchItem: FC<Item> = ({ email, name, onSuccess, addFriend }) => {
    const [ loading, setLoading ] = useState(false)

    const addPerson = (e: any) => {
        e.preventDefault()

        setLoading(true)

        addFriend({ email, onSuccess })

        setLoading(false)
    }

    return (
        <div className={styles.value}>
            <span>{email}</span>
            <span>{name}</span>
            {!loading ?
                <button onClick={e => addPerson(e)}>Add</button>
            :
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={20} height={20} alt='Loading' />
            }
        </div>
    )
}

export default connect((state: any) => ({ }), {  addFriend })(SearchItem);