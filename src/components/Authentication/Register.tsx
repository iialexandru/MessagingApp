import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'
import { Link } from 'react-router-dom'

import '../../styles/scss/Authentication/Register.scss'
import Code from './Code'


const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ show, setShow ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    
    const [ codePage, setCodePage ] = useState(false)


    return (
        <div className={'content'}>
            {!codePage ?
            <div className={'container'}>
                        <h1>Register</h1>

                        <div className={'textfield_box'}>
                        <TextField 
                            placeholder='Messager...' 
                            value={username} 
                            onChange={e => setUsername(e.target.value)} 
                            variant='standard'
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

                        <div className={'action'}>
                            {!loading ?
                                <button>Sign in</button>
                            :
                                <div style={{ display: 'flex', justifyContent: 'center', height: 80 }}>
                                    <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={80} height={80} alt='Loading' />
                                </div>
                            }
                            <Link to='/authentication/login'>Already logged in?</Link>
                        </div>
                    </div>
                :
                    <Code />
            }

        </div>
    )
}

export default Login;