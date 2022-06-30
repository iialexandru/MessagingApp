import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { useDebounce } from 'use-debounce'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import Friend from './Friend'
import { resetPeopleSearch, updateFriends } from '../../../../actions/socialActions'


const Friends = ({ resetPeopleSearch, friends, updateFriends, loading }: { resetPeopleSearch: (dispatch: any) => void, friends: any, updateFriends: (dispatch: any) => void, loading: true }) => {
    const [ search, setSearch ] = useState('')
    const [ _friends, setFriends ] = useState<any>(friends)

    useEffect(() => {
        resetPeopleSearch({})
    }, [ resetPeopleSearch ])

    useEffect(() => {
        updateFriends({})
    }, [ updateFriends ])

    useEffect(() => {
        if(!search.length) {
            setFriends(friends)
            return
        }
        
        const newFriends: any = []

        const letters = search.split('')
        
        _friends.forEach((friend: any) => {
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

            newFriends.push(friend)
        })
        setFriends(newFriends)
    }, [ search ])

    // const [ value ] = useDebounce(_friends, 200)
    
    return (
        <div className={styles.friends_container}>
            <input value={search} onChange={e => setSearch(e.target.value)} />

            {parseInt(_friends.length) > 0 &&
                <>
                    {!loading ?
                            <>
                                {_friends.map((person: { email: string, username: string, blocked: boolean }, key: number) => {
                                    return (
                                        <div key={key} className={styles.values}>
                                            <Friend key={key + 10} blocked={person.blocked}  email={person.email} name={person.username} />
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
            
            {parseInt(_friends.length) === 0 &&
                <div className={styles.none}>
                    <h2>No results found</h2>
                </div>
            }
        </div>
    )
}

export default connect((state: any) => ({ friends: state.social.friends, loading: state.social.loading  }), { resetPeopleSearch, updateFriends })(Friends);