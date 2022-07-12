import type { FC } from 'react';
import { useState } from 'react'
import { connect } from 'react-redux'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import { addFriend } from '../../../../actions/socialActions'
import useWindowSize from '../../../../utils/useWindowSize'


interface Item {
    email: string;
    name: string;
    onSuccess: () => void;
    addFriend: (dispatch: any) => void;
}


const SearchItem: FC<Item> = ({ email, name, onSuccess, addFriend }) => {
    const [ loading, setLoading ] = useState(false)

    const [ width ] = useWindowSize()

    const addPerson = (e: any) => {
        e.preventDefault()

        setLoading(true)

        addFriend({ email, onSuccess })

        setLoading(false)
    }

    return (
        <div className={styles.value}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985701/MessagingApp/man_5-512_esb1fi.webp' width={40} height={40} alt='Profile' />
                <span>{name}</span>
            </div>

            <div className={styles.mq_email}><span>{email}</span></div>


            {!loading ?
                <button style={{ marginTop: 20 }} onClick={e => addPerson(e)}>Add</button>
            :
                <img style={{ marginTop: 20 }} src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={20} height={20} alt='Loading' />
            }
        </div>
    )
}

export default connect((state: any) => ({ }), {  addFriend })(SearchItem);