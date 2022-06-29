import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

import styles from '../../styles/scss/Authentication/Register.module.scss'
import { codeRegister, defaultState } from '../../actions/authActions'
import useFormHandler from '../../hooks/useFormHandler'
import { server } from '../../config/index'
import ErrorPage from '../Layout/ErrorPage'
import { AuthPropsReducer } from '@typings'


const Code = ({ loggedIn, loading, codeRegister, serverErrors, defaultState }: Omit<AuthPropsReducer, 'completeForgotPassword' | 'login' | 'register' | 'forgotPassword'> ) => {
    const navigate = useNavigate()
    
    const [ found, setFound ] = useState(true)
    const [ startLoad, setStartLoad ] = useState(false)

    const { url_param } = useParams()

    const { values, errors, setField, verifyValidity, setError } = useFormHandler({ code: '' }, serverErrors)

    useEffect(() => {
        defaultState({})
    }, [ defaultState ])


    const onSuccess = () => {
        navigate('/home')
    }

    useEffect(() => {
        if(loggedIn && window.location.pathname === `/authentication/code/${url_param}`) {
            return navigate('/home')
        }

        const verifyValidityURL = async () => {
            try {
                await axios.post(`${server}/api/authentication/register/complete/verify/${url_param}`, {}, { withCredentials: true })
            } catch (err) {
                setFound(false)
            }
            setStartLoad(true)
        } 
        verifyValidityURL()
    }, [ url_param, loggedIn, navigate ])


    const registerCompleteRequest = async (e: any) => {
        e.preventDefault()

        verifyValidity()

        setError('fullError', '')

        if(errors?.code?.length > 0) {
            return;
        }

        codeRegister({ code: values.code, onSuccess })
    }

    if(!startLoad) return null
    return (
        found
        ?
            <div className={styles.content}>
                <div className={`${styles.container} ${styles.container_code}`}>
                    <h1>Enter code</h1>

                    <p className={styles.info}>You have just received a message on your email account. Check it out and enter the code in it below &#40;code is available for 2 minutes&#41;</p>

                    <div className={styles.textfield_box}>
                        <TextField 
                            value={values.code} 
                            onChange={e => { setField('code', e.target.value) } } 
                            variant='standard'
                            className={errors?.code?.length > 0 ? styles.error : ''}
                            helperText={errors.code}
                            autoComplete='code'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position='start'
                                        >
                                        <span style={{ color: '#D6BE9F'}}>123..</span>
                                    </InputAdornment>
                                )
                            }}
                            inputProps={{ maxLength: 6 }}
                        />
                    </div>

                    <div className={styles.action}>
                        {!loading ?
                            <button onClick={e => registerCompleteRequest(e)}>Send</button>
                        :
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={100} height={100} alt='Loading' />
                            </div>
                        }
                    </div>

                </div>
            </div>
        :
            <ErrorPage />
    )
}

export default connect((state: any) => ({ loggedIn: state.auth.loggedIn, loading: state.auth.loading, serverErrors: state.auth.errors }), { codeRegister, defaultState })(Code);