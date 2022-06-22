import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react'

import '../../styles/scss/Authentication/Register.scss'


const Login = () => {
    const [ code, setCode ] = useState('')
    const [ loading, setLoading ] = useState(false)
    

    return (
        <div className={'container container_code'}>
            <h1>Enter code</h1>

            <p className={'info'}>You have just received a message on your email account. Check it out and enter the code in it below &#40;code is available for 2 minutes&#41;</p>

            <div className={'textfield_box'}>
                <TextField 
                    value={code} 
                    onChange={e => setCode(e.target.value)} 
                    variant='standard'
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

            <div className={'action'}>
                {!loading ?
                    <button>Send</button>
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