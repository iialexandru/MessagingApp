import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import styles from '../../styles/scss/Authentication/ForgotPassword.module.scss'
import { server } from '../../config/index'
import ErrorPage from '../Layout/ErrorPage'
import useFormHandler from '../../hooks/useFormHandler'
import { completeForgotPassword, defaultState } from '../../actions/authActions'
import { AuthPropsReducer } from '@typings'
 

const ForgotPasswordComplete = ({ serverErrors, loading, loggedIn, completeForgotPassword , defaultState }: Omit<AuthPropsReducer, 'register' | 'login' | 'codeRegister' | 'forgotPassword'> ) => {
    const navigate = useNavigate()

    const [ startLoad, setStartLoad ] = useState(false)
    const [ check, setCheck ] = useState(true)
    
    
    const { unique_url } = useParams() 

    const [ showPassword, setShowPassword ] = useState(false)
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false)

    
    const [ sent, setSent ] = useState(false)

    const { values, setError, setField, errors, verifyValidity } = useFormHandler({ password: '', confirmPassword: '' }, serverErrors)

    useEffect(() => {
        defaultState({})
    }, [ defaultState])


    const onPageFail = () => {
        setCheck(false)
    }

    const onSuccess = () => {
        setSent(true)
    }

    useEffect(() => {
        if(loggedIn && window.location.pathname === `/authentication/forgot-password/${unique_url}`) {
            return navigate('/home')
        }

        const verifyRequest = async () => {
            try {
                await axios.post(`${server}/api/authentication/forgot-password/verify/${unique_url}`)
            } catch (err: any) {
                setCheck(false)
            } 
            setStartLoad(true)
        }

        verifyRequest()
    }, [ unique_url, loggedIn, navigate ])  


    
    const changePassRequest = async (e: any) => {
        e.preventDefault()

        setError('fullError', '')

        verifyValidity()

        if(errors?.password?.length > 0 || errors?.confirmPassword?.length > 0) return;

        completeForgotPassword({ password: values.password, confirmPassword: values.confirmPassword, unique_url, onSuccess, onPageFail })
    }
    
    if(!startLoad) return null;
    return (
        !check ?
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
                                    value={values.password} 
                                    type={!showPassword ? 'password' : 'text'}
                                    onChange={e => { setField('password', e.target.value) } } 
                                    variant='standard'
                                    autoComplete='newPassword'
                                    helperText={errors.password}
                                    onKeyDown={e => { if(e.key === 'Enter') { changePassRequest(e) } } } 
                                    className={errors?.password?.length > 0 ? styles.error : ''}  
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
                                    value={values.confirmPassword} 
                                    type={!showConfirmPassword ? 'password' : 'text'}
                                    onChange={e => { setField('confirmPassword', e.target.value) } } 
                                    variant='standard'
                                    onKeyDown={e => { if(e.key === 'Enter') { changePassRequest(e) } } } 
                                    autoComplete='newPassword'
                                    helperText={errors.confirmPassword}
                                    className={errors?.confirmPassword?.length > 0 ? styles.error : ''}  
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
                                            {errors.fullError && <span id='error'>Server Error</span>}
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

export default connect((state: any) => ({ loggedIn: state.auth.loggedIn, serverErrors: state.auth.errors, loading: state.auth.loading }), { completeForgotPassword, defaultState })(ForgotPasswordComplete);