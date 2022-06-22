import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'
import { Link } from 'react-router-dom'

import '../../styles/scss/Authentication/Login.scss'


const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ show, setShow ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    
    return (
        <div className={'content'}>
            <div className={'container'}>
                <h1>Login</h1>

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

                    <TextField 
                        placeholder='123abc...' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        type={!show ? 'password' : 'text'}
                        variant='standard'
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

                <div className={'confirm_actions'}>
                    {!loading ?
                        <button>Sign in</button>
                        :
                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={80} height={80} alt='Loading' />
                        </div>
                    }
                    <div className={'links'}>
                        <span>Don't have an account? <Link to='/authentication/register'>Sign Up</Link></span>
                        <div className={'forgot_p'}>
                            <Link to='/authentication/forgot-password'>Forgot password?</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;