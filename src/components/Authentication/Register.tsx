import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from '../../styles/scss/Authentication/Register.module.scss'
import Code from './Code'
import { server, dev } from '../../config/index'


const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ show, setShow ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    
    const [ codePage, setCodePage ] = useState(false)

    const [ error, setError ] = useState({ username: false, email: false, password: false })
    const [ errorMessages, setErrorMessages ] = useState({ username: '', email: '', password: '' })

    const [ fullError, setFullError ] = useState(false)

    const registerRequest = async (e: any) => {
        e.preventDefault()

        setFullError(false)
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        setError({
            username: username.length < 3,
            email: email.length < 3 || !email.match(emailRegex),
            password: password.length < 8 || password.length > 18
        })

        setErrorMessages({
            username: username.length < 3 ? 'Too short... (3chr)' : (username.length > 20 ? 'Too long... (20chr)' : ''),
            email: email.length < 3 ? 'Too short... (3chr)' : (!email.match(emailRegex) ? 'Invalid email' : ''),
            password: password.length < 8 ? 'Too short... (8chr)' : (password.length > 18 ? 'Too long... (18chr)' : '')
        })

        if(email.length < 3 || !email.match(emailRegex) || password.length < 8 || username.length < 3 || password.length > 18 || username.length > 20) {
            setLoading(false)
            return;
        }

        setLoading(true)

        const user = { username, email, password }
        const result = await axios.post(`${server}/api/authentication/register`, user, { withCredentials: true })
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
                                    } else if(err && err.response && err.response.data.type && err.response.data.type === 'username') {
                                        setError({ ...error, username: true })
                                        setErrorMessages({
                                            ...errorMessages,
                                            username: err.response.data.message
                                        }) 
                                    } else setFullError(true)
                                    setLoading(false)
                                })
        if(result && result.message) {
            setLoading(false)
            setCodePage(true)
        } else {
            setLoading(false)
        }
    }



    return (
        <div className={styles.content}>
            {!codePage ?
            <div className={styles.container}>
                        <h1>Register</h1>

                        <div className={styles.textfield_box}>
                            <TextField 
                                placeholder='Username...' 
                                value={username} 
                                className={error.username ? styles.error : ''}  
                                id='username'
                                name='username'
                                autoComplete='username'
                                onChange={e => { setUsername(e.target.value); if(error.username) { setError({ ...error, username: false }); setErrorMessages({ ...errorMessages, username: '' }) } } } 
                                variant='standard'
                                helperText={errorMessages.username}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment
                                            position='start'
                                            disablePointerEvents>
                                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655899604/MessagingApp/person-244_aeulq1.svg' width={30} height={25} alt='Logo' />
                                        </InputAdornment>
                                    )
                                }}
                                inputProps={{ maxLength: 20 }}
                            />
                            
                            <TextField 
                                placeholder='example@gmail.com' 
                                value={email} 
                                id='email'
                                autoComplete='email'
                                className={error.email ? styles.error : ''}  
                                name='email'
                                onChange={e => { setEmail(e.target.value); if(error.email) { setError({ ...error, email: false }); setErrorMessages({ ...errorMessages, email: '' }) } } } 
                                variant='standard'
                                helperText={errorMessages.email}
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

                            <TextField 
                                placeholder='123abc...' 
                                value={password} 
                                id='password'
                                name='password'
                                autoComplete='password'
                                className={error.password ? styles.error : ''}  
                                type={!show ? 'password' : 'text'}
                                onChange={e => { setPassword(e.target.value); if(error.password) { setError({ ...error, password: false }); setErrorMessages({ ...errorMessages, password: '' }) } } } 
                                variant='standard'
                                helperText={errorMessages.password}
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

                        <div className={styles.action}>
                            {!loading ?
                                <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'column wrap' }}>
                                    <button onClick={e => registerRequest(e)}>Sign up</button>
                                    {fullError && <span id='error'>Error</span>}
                                </div>
                            :
                                <div style={{ display: 'flex', justifyContent: 'center', height: 80 }}>
                                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={80} height={80} alt='Loading' />
                                </div>
                            }
                            <Link to='/authentication/login'>Already have an account?</Link>
                        </div>
                    </div>
                :
                    <Code />
            }

        </div>
    )
}

export default Login;