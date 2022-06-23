import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

import styles from '../../styles/scss/Authentication/Login.module.scss'
import { server, dev } from '../../config/index'


const Login = () => {
    const navigate = useNavigate()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ show, setShow ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const [ error, setError ] = useState({ email: false, password: false })
    const [ errorMessages, setErrorMessages ] = useState({ email: '', password: '' })

    const [ fullError, setFullError ] = useState(false)

    const loginRequest = async (e: any) => {
        e.preventDefault()

        setFullError(false)
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        setError({
            email: email.length < 3 || !email.match(emailRegex),
            password: password.length < 8 || password.length > 18
        })

        setErrorMessages({
            email: email.length < 3 ? 'Too short... (3chr)' : (!email.match(emailRegex) ? 'Invalid email' : ''),
            password: password.length < 8 ? 'Too short... (8chr)' : (password.length > 18 ? 'Too long... (18chr)' : '')
        })

        if(email.length < 3 || !email.match(emailRegex) || password.length < 8) {
            return;
        }

        setLoading(true)

        const user = { email, password }
        const result = await axios.post(`${server}/api/authentication/login`, user, { withCredentials: true })
                                .then(res => res.data)
                                .catch(err => {
                                    if(err && err.response && err.response.data.type && err.response.data.type === 'email') {
                                        setError({ ...error, email: true })
                                        setErrorMessages({
                                            ...errorMessages,
                                            email: err.response.data.message
                                        })
                                    } else if(err && err.response && err.response.data.type && err.response.data.type === 'password') {
                                        setError({ ...error, password: true })
                                        setErrorMessages({
                                            ...errorMessages,
                                            password: err.response.data.message
                                        })
                                    } else if(err && err.response && err.response.data.type && err.response.data.type === 'both') {
                                        setError({ email: true, password: true })
                                        setErrorMessages({
                                            email: '',
                                            password: err.response.data.message
                                        })
                                    } else setFullError(true)
                                    setLoading(false)
                                })
        if(result && result.message) {
            // Cookies.set('auth-token', result.authToken, { expires: 30, sameSite: dev ? 'lax' : 'none', secure: !dev })
            navigate('/home')
            setLoading(false)
        } else {
            setFullError(true)
            setLoading(false)
        }
    }
    
    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <h1>Login</h1>

                <div className={styles.textfield_box}>
                    <TextField 
                        placeholder='example@gmail.com' 
                        value={email} 
                        autoComplete='email'
                        onChange={e => { setEmail(e.target.value); if(error.email) { setError({ ...error, email: false }); setErrorMessages({ ...errorMessages, email: '' }) } } } 
                        variant='standard'
                        helperText={errorMessages.email}
                        className={error.email ? styles.error : ''}  
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

                    <TextField 
                        placeholder='123abc...' 
                        value={password} 
                        type={!show ? 'password' : 'text'}
                        onChange={e => { setPassword(e.target.value); if(error.password) { setError({ ...error, password: false }); setErrorMessages({ ...errorMessages, password: '' }) } } } 
                        variant='standard'
                        autoComplete='password'
                        helperText={errorMessages.password}
                        className={error.password ? styles.error : ''}  
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position='start'
                                    sx={{ cursor: 'pointer !important' }}
                                    onClick={() => setShow(!show)}
                                    >
                                    <img  src={!show ? 'https://res.cloudinary.com/multimediarog/image/upload/v1655898607/MessagingApp/padlock-3089_qxgjw9.svg' : 'https://res.cloudinary.com/multimediarog/image/upload/v1655898605/MessagingApp/padlock-3088_a8q6kt.svg' }  width={30} height={25} alt='Logo' />
                                </InputAdornment>
                            )
                        }}
                        inputProps={{ maxLength: 18 }}
                    />
                </div>

                <div className={styles.confirm_actions}>
                    {!loading ?
                            <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'column wrap' }}>
                                <button onClick={e => loginRequest(e)}>Sign in</button>
                                {fullError && <span id='error'>Server Error</span>}
                            </div>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={80} height={80} alt='Loading' />
                        </div>
                    }
                    <div className={styles.links}>
                        <span>Don't have an account? <Link to='/authentication/register'>Sign Up</Link></span>
                        <div className={styles.forgot_p}>
                            <Link to='/authentication/forgot-password'>Forgot password?</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;