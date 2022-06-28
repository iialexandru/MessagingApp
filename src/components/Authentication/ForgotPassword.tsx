import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from '../../styles/scss/Authentication/ForgotPassword.module.scss'
import useFormHandler from '../../hooks/FormHandler'
import { forgotPassword, defaultState } from '../../actions/authActions'


const Login = ({ loggedIn, loading, serverErrors, forgotPassword, defaultState }: { loggedIn: boolean, loading: boolean, serverErrors: any, forgotPassword: any, defaultState: any }) => {
    const navigate = useNavigate()

    const [ sent, setSent ] = useState(false)

    const { values, errors, setError, setField, verifyValidity } = useFormHandler({ email: '' }, serverErrors)


    useEffect(() => {
        defaultState()
    }, [ defaultState ])


    const onSuccess = () => {
        setSent(true)
    }

    const forgotPassRequest = async (e: any) => {
        e.preventDefault()

        setError('fullName', '')

        verifyValidity()

        if(errors?.email?.length > 0) return;

        forgotPassword({ email: values.email, onSuccess })
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
                                value={values.email} 
                                onChange={e => { setField('email', e.target.value) } } 
                                variant='standard'
                                helperText={errors.email}
                                autoComplete='email'
                                className={errors?.email?.length > 0 ? styles.error : ''}
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

export default connect((state: any) => ({ loggedIn: state.auth.loggedIn, serverErrors: state.auth.errors, loading: state.auth.loading }), { forgotPassword, defaultState })(Login);