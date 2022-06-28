import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from '../../styles/scss/Authentication/Register.module.scss'
import useFormHandler from '../../hooks/FormHandler'
import { register, defaultState } from '../../actions/authActions'


const Register = ({ loggedIn, serverErrors, register, loading, defaultState }: { loggedIn: boolean, serverErrors: any, register: any, loading: boolean, defaultState: any }) => {
    const navigate = useNavigate()
    const [ show, setShow ] = useState(false)
    
    const { values, errors, setField, verifyValidity, setError } = useFormHandler({ email: '', password: '', username: '' }, serverErrors)

    useEffect(() => {
        defaultState()
    }, [ defaultState ])


    const onSuccess = (url: string) => {
        navigate(`/authentication/code/${url}`)
    }


    const registerRequest = async (e: any) => {
        e.preventDefault()

        setError('fullError', '')
        
        verifyValidity()

        if(errors?.email?.length > 0 || errors?.password?.length > 0 || errors?.username?.length > 0) return;
        
        register({ email: values.email, password: values.password, username: values.username, onSuccess })
    }


    return (
        <div className={styles.content}>
            <div className={styles.container}>
                <h1>Register</h1>

                <div className={styles.textfield_box}>
                    <TextField 
                        placeholder='Username...' 
                        value={values.username} 
                        className={errors?.username?.length > 0 ? styles.error : ''}  
                        id='username'
                        name='username'
                        autoComplete='username'
                        onChange={e => { setField('username', e.target.value) } } 
                        variant='standard'
                        helperText={errors.username}
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
                        value={values.email} 
                        id='email'
                        autoComplete='email'
                        className={errors?.password?.length > 0 ? styles.error : ''}  
                        name='email'
                        onChange={e => { setField('email', e.target.value) } } 
                        variant='standard'
                        helperText={errors.email}
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
                        value={values.password} 
                        id='password'
                        name='password'
                        autoComplete='password'
                        className={errors?.password?.length > 0 ? styles.error : ''}  
                        type={!show ? 'password' : 'text'}
                        onChange={e => { setField('password', e.target.value) } } 
                        variant='standard'
                        helperText={errors.password}
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
                            {errors.fullError && <span id='error'>Error</span>}
                        </div>
                    :
                        <div style={{ display: 'flex', justifyContent: 'center', height: 80 }}>
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={80} height={80} alt='Loading' />
                        </div>
                    }
                    <Link to='/authentication/login'>Already have an account?</Link>
                </div>
            </div>
        </div>
    )
}

export default connect((state: any) => ({ loggedIn: state.auth.loggedIn, serverErrors: state.auth.errors, loading: state.auth.loading }), { register, defaultState })(Register);