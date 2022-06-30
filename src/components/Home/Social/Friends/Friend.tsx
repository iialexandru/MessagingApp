import type { FC } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux'

import { blockFriend, unblockFriend, removeFriend, updateFriends } from '../../../../actions/socialActions'
import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';


interface Item {
    name: string;
    email: string;
    blocked: boolean;
    blockFriend: (dispatch: any) => void; 
    unblockFriend: (dispatch: any) => void; 
    removeFriend: (dispatch: any) => void; 
    updateFriends: (dispatch: any) => void;
}


const Friend: FC<Item> = ({ name, email, blocked, blockFriend, unblockFriend, removeFriend, updateFriends }) => {
    const [ active, setActive ]  = useState<boolean>(false)

    const [ loading, setLoading ] = useState(false)

    const onSuccess = () => {
        updateFriends({})
    }


    const block = (e: any) => {
        e.preventDefault()

        if(loading) return;

        setLoading(true)


        blockFriend({ email, onSuccess });

        
        setLoading(false)
    }


    const unblock = (e: any) => {
        e.preventDefault()

        if(loading) return;

        setLoading(true)

        unblockFriend({ email, onSuccess })
        
        setLoading(false)
    }

    const remove = (e: any) => {
        e.preventDefault()

        if(loading) return;

        setLoading(true)

        removeFriend({ email, onSuccess })
        
        setLoading(false)
    }



    return (
        <div className={styles.friend}>
            <div className={styles.up_list}>
                <span>{email}</span>
                <span>{name}</span>
                <img onClick={() => setActive(!active)} style={{ transform: active ? 'rotate(0deg)' : 'rotate(180deg)' }} src='https://res.cloudinary.com/multimediarog/image/upload/v1656250600/MessagingApp/arrow-down-3101_5_rdoajz.svg' width={30} height={25} alt='Arrow' />
            </div>
            <div className={`${styles.down_list} ${!active ? styles.close : ''}`}>
                {!blocked ?
                    <>
                        {!loading ?
                            <button id='block' onClick={e => block(e)}>Block</button>
                        :
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={20} height={20} alt='Loading' />
                        }
                    </>
                :
                    <>
                        {!loading ?
                            <button id='unblock' onClick={e => unblock(e)}>Unblock</button>
                        :
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={20} height={20} alt='Loading' />
                        }
                    </>
                }
                {!loading ?
                    <button id='unfriend' onClick={e => remove(e)}>Unfriend</button>
            :
                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={20} height={20} alt='Loading' />
                }
            </div>
        </div>
    )
}

export default connect((state: any) => ({  }), { blockFriend, unblockFriend, removeFriend, updateFriends})(Friend);