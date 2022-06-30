import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import Request from './Request'
import { resetPeopleSearch, showFriendRequests } from '../../../../actions/socialActions'


const Requests = ({ resetPeopleSearch, showFriendRequests, friendRequests, loading }: { resetPeopleSearch: (dispatch: any) => void, showFriendRequests: (dispatch: any) => void, friendRequests: any, loading: true  }) => {
    const [ search, setSearch ] = useState('')
    const [ _friendRequests, setFriendRequests ] = useState(friendRequests)

    useEffect(() => {
        resetPeopleSearch({})
    }, [ resetPeopleSearch ])

    useEffect(() => {
        showFriendRequests({})
    }, [ showFriendRequests ])

    useEffect(() => {
        if(!search.length) {
            setFriendRequests(friendRequests)
            return
        }
        
        const newFriendRequests: any = []

        const letters = search.split('')
        
        _friendRequests.forEach((friend: any) => {
            const friendLetters = friend.email.split('')

            if(friendLetters.length < letters.length) return;

            let valid = true

            console.log(friendLetters, letters)
            for(let i = 0; i < letters.length; i++) {
                if(friendLetters[i] !== letters[i]) {
                    valid = false
                    break
                }
            }

            if(!valid) return

            newFriendRequests.push(friend)
        })
        setFriendRequests(newFriendRequests)
    }, [ search ])

    return (
        <div className={styles.friends_container}>
            <input value={search} onChange={e => setSearch(e.target.value)} />
            {(_friendRequests && parseInt(_friendRequests.length) > 0) &&
                <>
                    {!loading ?
                            <>
                                {_friendRequests.map((person: { email: string, username: string}, key: number) => {
                                    return (
                                        <div key={key} className={styles.values}>
                                            <Request  email={person.email} name={person.username} />
                                        </div>
                                    )
                                })}
                            </>
                        :
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, width: '100%'}}>
                                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={150} height={150} alt='Loading' />
                            </div>
                    }
                </>

            }
            
            {(!_friendRequests || parseInt(_friendRequests.length) === 0) &&
                <div className={styles.none}>
                    <h2>No results found</h2>
                </div>
            }
        </div>
    )
}

export default connect((state: any) => ({ friendRequests: state.social.friendRequests, loading: state.social.loading }), { resetPeopleSearch, showFriendRequests })(Requests);