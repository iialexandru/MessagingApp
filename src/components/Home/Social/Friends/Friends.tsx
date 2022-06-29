import { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import Friend from './Friend'
import { resetPeopleSearch, updateFriends } from '../../../../actions/socialActions'


const Friends = ({ resetPeopleSearch, friends, updateFriends, loading }: { resetPeopleSearch: (dispatch: any) => void, friends: any, updateFriends: (dispatch: any) => void, loading: true }) => {
    const [ search, setSearch ] = useState('')

    useEffect(() => {
        resetPeopleSearch({})
    }, [ resetPeopleSearch ])

    useEffect(() => {
        updateFriends({})
    }, [ updateFriends ])
    
    return (
        <div className={styles.friends_container}>
            <input value={search} onChange={e => setSearch(e.target.value)} />
            {parseInt(friends.length) > 0 &&
                <>
                    {!loading ?
                            <>
                                {friends.map((person: { email: string, username: string, blocked: boolean }, key: number) => {
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
            
            {parseInt(friends.length) === 0 &&
                <div className={styles.none}>
                    <h2>No results found</h2>
                </div>
            }
        </div>
    )
}

export default connect((state: any) => ({ friends: state.social.friends, loading: state.social.loading  }), { resetPeopleSearch, updateFriends })(Friends);