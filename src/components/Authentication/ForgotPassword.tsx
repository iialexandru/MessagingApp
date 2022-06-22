import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../../styles/scss/Authentication/ForgotPassword.scss'


const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ sent, setSent ] = useState(true)

    const navigate = useNavigate()
    
    return (
        <div className={'content'}>
            <div className={'container'}>
                {!sent ?
                    <>
                        <h1>Forgot Password?</h1>

                        <p className={'info'}>
                            Enter you email address that is used for your account to reset you password. If it is correct, then you will receive a message on it with the link for changing the password.
                        </p>

                        <div className={'textfield_box'}>
                            <TextField 
                                placeholder='example@gmail.com' 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                variant='standard'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment
                                            position='start'
                                            disablePointerEvents>
                                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655896072/MessagingApp/mail-142_4_ec6bba.svg' width={30} height={30} alt='Logo' />
                                        </InputAdornment>
                                    )
                                }}
                            />

                        </div>

                        <div className={'confirm_actions'}>
                            {!loading ?
                                <button>Change password</button>
                                :
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={80} height={80} alt='Loading' />
                                </div>
                            }
                            <div className={'links'}>
                                <span>Remembered your password? <Link to='/authentication/login'>Sign In</Link></span>
                            </div>
                        </div>
                    </>
                :
                        <>
                            <h1>Email Sent</h1>
                            <p className={'info'}>
                                We've just sent an email to your account with a link inside it for resetting you password
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655902576/MessagingApp/sent-email-2579_u4h9so.svg' width={100} height={100} alt='Email' />
                            </div>

                            
                            <div className={'confirm_actions'}>
                                    <button onClick={() => navigate('/authentication/login')}>Back to login</button>
                            </div>
                        </>
                }

            </div>
        </div>
    )
}

export default Login;