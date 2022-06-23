import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import styles from '../../styles/scss/Authentication/ForgotPassword.module.scss'
import { server } from '../../config/index'


const Login = () => {
    const navigate = useNavigate()

    const [ email, setEmail ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ sent, setSent ] = useState(false)
    const [ error, setError ] = useState('')

    
    const forgotPassRequest = async (e: any) => {
        e.preventDefault()

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        setError(email.length > 500 ? 'Max 500 char...' : (!email.match(emailRegex) ? 'Invalid email...' : ''))

        if(email.length > 500 || !email.match(emailRegex)) {
            setLoading(false)
            return;
        }

        setLoading(true)

        const result = await axios.post(`${server}/api/authentication/forgot-password`, { email }, { withCredentials: true })
                                .then(res => res.data)
                                .catch(err => {
                                    if(err && err.response && err.response.data.message) {
                                        setError(err.response.data.message)
                                    }
                                    setLoading(false)
                                })
        if(result && result.message) {
            setLoading(false)
            setSent(true)
        } else {
            setLoading(false)
        }
        setLoading(false)
    }
    
    return (
        <div className={styles.content}>
            <div className={styles.container}>
                {!sent ?
                    <>
                        <h1>Forgot Password?</h1>

                        <p className={styles.info}>
                            Enter you email address that is used for your account to reset you password. If it is correct, then you will receive a message on it with the link for changing the password.
                        </p>

                        <div className={styles.textfield_box}>
                            <TextField 
                                placeholder='example@gmail.com' 
                                value={email} 
                                onChange={e => { setEmail(e.target.value); if(error.length > 0) { setError('') } } } 
                                variant='standard'
                                helperText={error}
                                autoComplete='email'
                                className={error.length > 0 ? styles.error : ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment
                                            position='start'
                                            disablePointerEvents>
                                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655896072/MessagingApp/mail-142_4_ec6bba.svg' width={30} height={30} alt='Logo' />
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{ maxLength: 500 }}
                            />

                        </div>

                        <div className={styles.confirm_actions}>
                            {!loading ?
                                <button onClick={e => forgotPassRequest(e)}>Change password</button>
                                :
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={80} height={80} alt='Loading' />
                                </div>
                            }
                            <div className={styles.links}>
                                <span>Remembered your password? <Link to='/authentication/login'>Sign In</Link></span>
                            </div>
                        </div>
                    </>
                :
                        <>
                            <h1>Email Sent</h1>
                            <p className={styles.info}>
                                We've just sent an email to your account with a link inside it for resetting you password
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655902576/MessagingApp/sent-email-2579_u4h9so.svg' width={100} height={100} alt='Email' />
                            </div>

                            
                            <div className={styles.confirm_actions}>
                                    <button onClick={() => navigate('/authentication/login')}>Back to login</button>
                            </div>
                        </>
                }

            </div>
        </div>
    )
}

export default Login;