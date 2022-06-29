import type { FC } from 'react';
import { useState } from 'react'
import { connect } from 'react-redux'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import { acceptFriendRequest, rejectFriendRequest, showFriendRequests } from '../../../../actions/socialActions'


interface Props {
    name: string;
    email: string;
    acceptFriendRequest: (dispatch: any) => void;
    rejectFriendRequest: (dispatch: any) => void;
    showFriendRequests: (dispatch: any) => void;
}


const Request: FC<Props> = ({ name, email, acceptFriendRequest, rejectFriendRequest, showFriendRequests }) => {

    const [ loading, setLoading ] = useState(false)

    const onSuccess = () => {
        showFriendRequests({})
    }

    const accept = (e: any) => {
        e.preventDefault();

        setLoading(true)

        acceptFriendRequest({ email, onSuccess })
        
        setLoading(false)
    }


    const reject = (e: any) => {
        e.preventDefault();

        setLoading(true)

        rejectFriendRequest({ email, onSuccess })
        
        setLoading(false)
    }


    return (
        <div className={styles.value}>
            <span>{email}</span>
            <span>{name}</span>

            <div className={styles.buttons}>
                {!loading ?
                    <>
                        <button id='accept' onClick={e => accept(e)}>Accept</button>
                        <button id='reject' onClick={e => reject(e)}>Reject</button>
                    </>
                :
                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={20} height={20} alt='Loading' />
                }
            </div>
        </div>
    )
}

export default connect((state: any) => ({  }), { acceptFriendRequest, rejectFriendRequest, showFriendRequests })(Request);