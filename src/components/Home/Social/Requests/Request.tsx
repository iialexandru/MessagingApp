import type { FC } from 'react';
import { useState } from 'react'
import { connect } from 'react-redux'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import { acceptFriendRequest, rejectFriendRequest, showFriendRequests } from '../../../../actions/socialActions'
import { addConversation } from '../../../../actions/conversationActions'
import { useSocket } from '../../../../hooks/useSocket'
import useWindowSize from '../../../../utils/useWindowSize'


interface Props {
    name: string;
    email: string;
    acceptFriendRequest: (dispatch: any) => void;
    rejectFriendRequest: (dispatch: any) => void;
    showFriendRequests: (dispatch: any) => void;
    setFriendRequests: (dispatch?: any) => void;
    addConversation: any;
}


const Request: FC<Props> = ({ name, email, acceptFriendRequest, rejectFriendRequest, showFriendRequests, setFriendRequests, addConversation }) => {

    const [ loading, setLoading ] = useState(false)

    const [ width ] = useWindowSize()
 
    const socket = useSocket()

    const onSuccess = () => {
        showFriendRequests({})
        setFriendRequests((friendRequests: any) => friendRequests.filter((fr: any) => fr.email !== email))
    }

    const acceptedRequestCallback = ({ conversation }: { conversation: any }) => {
        const onAdded = () => {
            socket!.addNewConversation({ conversation })
        }

        addConversation({ conversation, onAdded })
    }

    const accept = (e: any) => {
        e.preventDefault();

        setLoading(true)

        acceptFriendRequest({ email, onSuccess, acceptedRequestCallback })
        
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985701/MessagingApp/man_5-512_esb1fi.webp' width={40} height={40} alt='Profile' />
                <span id='name'>{name}</span>
            </div>

            <div className={styles.mq_email}>
                <span>{email}</span>
            </div> 

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

export default connect((state: any) => ({  }), { acceptFriendRequest, rejectFriendRequest, showFriendRequests, addConversation })(Request);