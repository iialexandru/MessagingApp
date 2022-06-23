import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { server, dev } from '../../config/index'
import styles from '../../styles/scss/Authentication/Register.module.scss'


const Login = () => {
    const navigate = useNavigate()
    const [ code, setCode ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const [ error, setError ] = useState('')
    


    const registerCompleteRequest = async (e: any) => {
        e.preventDefault()

        setError(code.length !== 6 ? 'Code must be 6 chars long' : '')

        if(code.length !== 6) {
            setLoading(false)
            return;
        }

        setLoading(true)

        const result = await axios.post(`${server}/api/authentication/register/complete`, { code }, { withCredentials: true })
                                .then(res => res.data)
                                .catch(err => {
                                    if(err && err.response && err.response.data.message) {
                                        setError(err.response.data.message)
                                    } 
                                    setLoading(false)
                                })
        if(result && result.message) {
            // Cookies.set('auth-token', result.authToken, { expires: 30, sameSite: dev ? 'lax' : 'none', secure: !dev })
            navigate('/home')
            setLoading(false)
        } else {
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <div className={`${styles.container} ${styles.container_code}`}>
            <h1>Enter code</h1>

            <p className={styles.info}>You have just received a message on your email account. Check it out and enter the code in it below &#40;code is available for 2 minutes&#41;</p>

            <div className={styles.textfield_box}>
                <TextField 
                    value={code} 
                    onChange={e => { setCode(e.target.value); if(error.length > 0) { setError('') } } } 
                    variant='standard'
                    className={error.length > 0 ? styles.error : ''}
                    helperText={error}
                    autoComplete='code'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                position='start'
                                >
                                <span style={{ color: '#D6BE9F'}}>123..</span>
                            </InputAdornment>
                        )
                    }}
                    inputProps={{ maxLength: 6 }}
                />
            </div>

            <div className={styles.action}>
                {!loading ?
                    <button onClick={e => registerCompleteRequest(e)}>Send</button>
                :
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src='https://res.cloudinary.com/multimediarog/image/upload/v1655900641/MessagingApp/Spinner-1s-200px_3_qasllt.svg' width={100} height={100} alt='Loading' />
                    </div>
                }
            </div>

        </div>
    )
}

export default Login;