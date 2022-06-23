import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import styles from '../../styles/scss/Authentication/ForgotPassword.module.scss'
import { server } from '../../config/index'
import ErrorPage from '../Layout/ErrorPage'


const Login = () => {
    const navigate = useNavigate()
    const [ check, setCheck ] = useState(false)

    const { unique_url } = useParams() 



    useEffect(() => {
        let error = false
        const verifyRequest = async (error: boolean) => {
            const result = await axios.post(`${server}/api/authentication/forgot-password/verify/${unique_url}`)
                                    .then(res => res.data)
                                    .catch(err => {
                                        error = true
                                    })
            return result;
        }

        const result: any = verifyRequest(error);

        if(error) return;

        if(result && result.message === 'Request found') {
            setCheck(true)
        } else return;
    }, [ unique_url ])


    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')     

    const [ showPassword, setShowPassword ] = useState(false)
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)

    const [ error, setError ] = useState({ password: false, confirmPassword: false })
    const [ errorMessages, setErrorMessages ] = useState({ password: '', confirmPassword: '' })

    const [ loading, setLoading ] = useState(false)
    const [ sent, setSent ] = useState(false)

    const [ fullError, setFullError ] = useState(false)
    
    const changePassRequest = async (e: any) => {
        e.preventDefault()


        setError({ 
            password: password.length < 8 || password.length > 18,
            confirmPassword: confirmPassword.length < 8 || confirmPassword.length > 18
        })

        setErrorMessages({
            password: password.length < 8 ? 'Too short... (8chr)' : (password.length > 18 ? 'Too long... (18chr)' : ''),
            confirmPassword: confirmPassword.length < 8 ? 'Too short... (8chr)' : (confirmPassword.length > 18 ? 'Too long... (18chr)' : '')
        })

        if(password.length < 8 || password.length > 18 || confirmPassword.length < 8 || confirmPassword.length > 18) {
            setLoading(false)
            return;
        }

        setLoading(true)

        const result = await axios.post(`${server}/api/authentication/forgot-password/change/${unique_url}`, { password, confirmPassword }, { withCredentials: true })
                                .then(res => res.data)
                                .catch(err => {
                                    if(err && err.response && err.response.data.type && err.response.data.type === 'confirmPassword') {
                                        setError({ ...error, confirmPassword: true })
                                        setErrorMessages({
                                            ...errorMessages,
                                            confirmPassword: err.response.data.message
                                        })
                                    } else if(err && err.response && err.response.data.type && err.response.data.type === 'password') {
                                        setError({ ...error, password: true })
                                        setErrorMessages({
                                            ...errorMessages,
                                            password: err.response.data.message
                                        })
                                    } else if(err && err.response && err.response.data.type && err.response.data.type === 'both') {
                                        setError({ confirmPassword: true, password: true })
                                        setErrorMessages({
                                            password: '',
                                            confirmPassword: err.response.data.message
                                        })
                                    } else if(err && err.response && err.response.data.type && err.response.data.type === 'page') {
                                        setCheck(false)
                                    } else setFullError(true)
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
        check ?
            <ErrorPage />
        :
            <div className={styles.content}>
                <div className={styles.container}>
                    {!sent ?
                        <>
                            <h1>Change Password</h1>

                            <div className={styles.textfield_box}>
                                <TextField 
                                    placeholder='123abc...' 
                                    value={password} 
                                    type={!showPassword ? 'password' : 'text'}
                                    onChange={e => { setPassword(e.target.value); if(error.password) { setError({ ...error, password: false }); setErrorMessages({ ...errorMessages, password: '' }) } } } 
                                    variant='standard'
                                    autoComplete='newPassword'
                                    helperText={errorMessages.password}
                                    className={error.password ? styles.error : ''}  
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position='start'
                                                sx={{ cursor: 'pointer !important' }}
                                                onClick={() => setShowPassword(!showPassword)}
                                                >
                                                <img  src={!showPassword ? 'https://res.cloudinary.com/multimediarog/image/upload/v1655898607/MessagingApp/padlock-3089_qxgjw9.svg' : 'https://res.cloudinary.com/multimediarog/image/upload/v1655898605/MessagingApp/padlock-3088_a8q6kt.svg' }  width={30} height={25} alt='Logo' />
                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{ maxLength: 18 }}
                                />

                                <TextField 
                                    placeholder='123abc...' 
                                    value={confirmPassword} 
                                    type={!showConfirmPassword ? 'password' : 'text'}
                                    onChange={e => { setConfirmPassword(e.target.value); if(error.confirmPassword) { setError({ ...error, confirmPassword: false }); setErrorMessages({ ...errorMessages, confirmPassword: '' }) } } } 
                                    variant='standard'
                                    autoComplete='newPassword'
                                    helperText={errorMessages.confirmPassword}
                                    className={error.confirmPassword ? styles.error : ''}  
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment
                                                position='start'
                                                sx={{ cursor: 'pointer !important' }}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                <img  src={!showConfirmPassword ? 'https://res.cloudinary.com/multimediarog/image/upload/v1655898607/MessagingApp/padlock-3089_qxgjw9.svg' : 'https://res.cloudinary.com/multimediarog/image/upload/v1655898605/MessagingApp/padlock-3088_a8q6kt.svg' }  width={30} height={25} alt='Logo' />
                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{ maxLength: 18 }}
                                />

                            </div>

                            <div className={styles.confirm_actions}>
                                {!loading ?
                                        <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'column wrap', gap: '1em' }}>
                                            <button onClick={e => changePassRequest(e)}>Change password</button>
                                            {fullError && <span id='error'>Error</span>}
                                        </div>
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
                                <h1>Password Changed</h1>
                                <p className={styles.info}>
                                    Now you can use the new password to get into your account
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655981355/MessagingApp/verified-3600_bin8tr.svg' width={100} height={100} alt='Email' />
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