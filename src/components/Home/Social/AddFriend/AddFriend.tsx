import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useDebounce } from 'use-debounce'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import SearchItem from './SearchItem';
import { showPeopleSearch, resetPeopleSearch, updateFriends } from '../../../../actions/socialActions';
import { SocialRedux } from '@typings'


const AddFriend: FC<Omit<SocialRedux, 'friends' | 'loading' | 'showFriendRequests' | 'friendRequests' | 'setConversationId'>> = ({ peopleSearch, showPeopleSearch, psLoading, resetPeopleSearch, updateFriends }) => {
    const [ search, setSearch ] = useState('')
    const [ value ] = useDebounce(peopleSearch, 400)

    useEffect(() => {
        updateFriends({})
    }, [ updateFriends ])
    
    useEffect(() => {
        showPeopleSearch({ email: search })
    }, [ search, showPeopleSearch ])

    const onSuccess = () => {
        setSearch('')
        resetPeopleSearch({})
    }


    return (
        <div className={styles.friends_container}>
            <input value={search} onChange={e => { setSearch(e.target.value);  } } />
            {(value && parseInt(value.length) > 0 && Boolean(search.length)) &&
                <>
                    {!psLoading ?
                            <>
                                {value.map((person: { email: string, username: string}, key: number) => {
                                    return (
                                        <div key={key} className={styles.values}>
                                            <SearchItem  onSuccess={onSuccess} email={person.email} name={person.username} />
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
            
            {(!value || parseInt(value.length) === 0 || !Boolean(search.length)) &&
                <div className={styles.none}>
                    <h2>No results found</h2>
                </div>
            }
        </div>
    )
}

export default connect((state: any) => ({ peopleSearch: state.social.peopleSearch, psLoading: state.social.psLoading }), { showPeopleSearch, resetPeopleSearch, updateFriends })(AddFriend);