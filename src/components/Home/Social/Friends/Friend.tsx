import type { FC, Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux'

import { blockFriend, unblockFriend, removeFriend } from '../../../../actions/socialActions'
import { removeConversation, statusConversation } from '../../../../actions/conversationActions'
import { useSocket } from '../../../../hooks/useSocket'
import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import useWindowSize from '../../../../utils/useWindowSize'


interface Item {
    name: string;
    email: string;
    blocked: boolean;
    friendId: string;
    blockFriend: (dispatch: any) => void; 
    unblockFriend: (dispatch: any) => void; 
    removeFriend: (dispatch: any) => void; 
    removeConversation: any
    setConversationId: Dispatch<SetStateAction<string | null>>;
    statusConversation: any;
}


const Friend: FC<Item> = ({ friendId, name, email, blocked, blockFriend, unblockFriend, removeFriend, removeConversation, setConversationId, statusConversation }) => {
    const [ active, setActive ]  = useState<boolean>(false)

    const [ loading, setLoading ] = useState(false)

    
    const socket = useSocket()

    const onSuccess = ({ conversationId, convStatus }: { conversationId: string, convStatus: boolean }) => {
        const onSocket = () => {
            socket!.sendConversationStatus({ conversationId, convStatus })
        }

       statusConversation({ conversationId, convStatus, onSocket })
    }

    const remFrCallback = ({ conversationId }: { conversationId: string }) => {
        setConversationId(null)
        removeConversation({ conversationId })
    }


    const block = (e: any) => {
        e.preventDefault()

        if(loading) return;

        setLoading(true)


        blockFriend({ email, onSuccess, friendId });

        
        setLoading(false)
    }


    const unblock = async (e: any) => {
        e.preventDefault()

        if(loading) return;

        setLoading(true)

        unblockFriend({ email, onSuccess, friendId })
        
        setLoading(false)
    }

    
    const onRemoveFriend = ({ conversationId }: { conversationId: string }) => {
        socket!.removeConversation({ conversationId })
    }


    const remove = (e: any) => {
        e.preventDefault()

        if(loading) return;

        setLoading(true)

        removeFriend({ email, remFrCallback, onRemoveFriend })
        
        setLoading(false)
    }



    return (
        <div className={styles.friend}>
            <div className={styles.up_list}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655985701/MessagingApp/man_5-512_esb1fi.webp' width={40} height={40} alt='Profile' />
                    <span>{name}</span>
                </div>
                <img onClick={() => setActive(!active)} style={{ transform: active ? 'rotate(0deg)' : 'rotate(180deg)' }} src='https://res.cloudinary.com/multimediarog/image/upload/v1656250600/MessagingApp/arrow-down-3101_5_rdoajz.svg' width={30} height={25} alt='Arrow' />
            </div>

            <div className={styles.mq_email}><span>{email}</span></div>
            
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

export default connect((state: any) => ({  }), { blockFriend, unblockFriend, removeFriend, removeConversation, statusConversation })(Friend);