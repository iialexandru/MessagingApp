import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import styles from '../../styles/scss/Authentication/Login.module.scss'
import { login, defaultState } from '../../actions/authActions'
import useFormHandler from '../../hooks/FormHandler'

interface Props {
    values: any;
    errors: any;
    setErrors: any;
    setField: any;
    verifyValidity: () => void
}


const Login = ({ loggedIn, login, loading, serverErrors, defaultState }: { loggedIn: boolean, login: (dispatch: any) => void, loading: boolean, serverErrors: any, defaultState: any }) => {
    const navigate = useNavigate()

    const [ show, setShow ] = useState(false)

    const { values, errors, setField, verifyValidity, setError } = useFormHandler({ email: '', password: '' }, serverErrors)

    useEffect(() => {
        defaultState()
    }, [ defaultState ])

    
    const onSuccess = () => {
        navigate('/home')
    }


    const loginRequest = async (e: any) => {
        e.preventDefault()

        setError('fullError', '')
        
        verifyValidity()

        if(errors?.email?.length > 0 || errors?.password?.length > 0) return;
        
        login({ email: values.email, password: values.password, onSuccess })
    }
    
    return (
        errors &&
                <div className={styles.content}>
                    <div className={styles.container}>
                        <h1>Login</h1>

                        <div className={styles.textfield_box}>
                            <TextField 
                                placeholder='example@gmail.com' 
                                value={values.email} 
                                autoComplete='email'
                                onChange={e => { setField('email', e.target.value); setError('both', '') } } 
                                variant='standard'
                                helperText={errors.email}
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
                            />

                            <TextField 
                                placeholder='123abc...' 
                                value={values.password} 
                                type={!show ? 'password' : 'text'}
                                onChange={e => { setField('password', e.target.value); setError('both', '') } } 
                                variant='standard'
                                autoComplete='password'
                                helperText={errors.password || errors.both}
                                className={(errors?.password?.length > 0 || errors?.both?.length) ? styles.error : ''}  
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
                                        {errors?.fullError?.length > 0 && <span id='error'>Server Error</span>}
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

export default connect((state: any) => ({ loggedIn: state.auth.loggedIn, serverErrors: state.auth.errors, loading: state.auth.loading }), { login, defaultState })(Login);