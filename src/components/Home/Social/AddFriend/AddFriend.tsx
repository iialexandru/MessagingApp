import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useDebounce } from 'use-debounce'

import styles from '../../../../styles/scss/Home/Social/SocialContainer.module.scss';
import SearchItem from './SearchItem';
import { showPeopleSearch, resetPeopleSearch} from '../../../../actions/socialActions';


const AddFriend = ({ peopleSearch, showPeopleSearch, psLoading, resetPeopleSearch }: { peopleSearch: any, showPeopleSearch: (dispatch: any) => void, psLoading: boolean, resetPeopleSearch: (dispatch: any) => void }) => {
    const [ search, setSearch ] = useState('')
    // useDebounce(search, 1000)
    // console.log(peopleSearch)
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
            {(peopleSearch && parseInt(peopleSearch.length) > 0) &&
                <>
                    {!psLoading ?
                            <>
                                {peopleSearch.map((person: { email: string, username: string}, key: number) => {
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
            
            {(!peopleSearch || parseInt(peopleSearch.length) === 0) &&
                <div className={styles.none}>
                    <h2>No results found</h2>
                </div>
            }
        </div>
    )
}

export default connect((state: any) => ({ peopleSearch: state.social.peopleSearch, psLoading: state.social.psLoading }), { showPeopleSearch, resetPeopleSearch })(AddFriend);