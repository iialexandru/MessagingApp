import type { FC, Dispatch, SetStateAction} from 'react'
import React, { useState } from 'react'


interface PropsFormHandler {
    initialValues: any;
    submit: boolean;
    setSubmit: Dispatch<SetStateAction<boolean>>;
    children: (values: any, errors: any, setErrors: any, setField: any, verifyValidity: () => void) => React.ReactNode;
}


const FormHandler: FC<PropsFormHandler> = ({ initialValues, submit, setSubmit }, children) => {
    const [ errors, setErrors ] = useState<any>({})
    const [ values, setValues ] = useState<any>(initialValues)

    const setField = (name: string, newValue: string) => {
        setValues({ ...values,  [ name ]: newValue })
        setErrors({ ...errors,  [ name ]: '' })
    }

    const validate = (name: string, value: string) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
        if(name === 'email') {
            if(value.length < 3) {
                return 'Too short... (3chr)'
            } else if (value.length > 500) {
                return 'Too long... (500chr)'
            } else if(!value.match(emailRegex)) {
                return 'Invalid email format'
            } else return ''
         } else if(name === 'password') {
            if(value.length < 8) {
                return 'Too short... (8chr)'
            } else if(value.length > 18) {
                return 'Too long... (20chr)'
            } else return ''
         }
    }

    const verifyValidity = () => {
        Object.keys(values).forEach((key: string) => {
            errors[key] = validate(key, values[key])
            return;
        })
    }


    const Component = children

    return <Component values={values} errors={errors} setErrors={setErrors} setField={setField} verifyValidity={verifyValidity} />
}

export default FormHandler;