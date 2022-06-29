import { useState, useEffect } from 'react'
import { FormHandler } from '@typings'


const useFormHandler: (intialValues: any, serverErrors: any) => FormHandler = (initialValues, serverErrors: any) => {
    const [ errors, setErrors ] = useState<any>({})
    const [ values, setValues ] = useState<any>(initialValues)

    const setField = (name: string, newValue: string) => {
        setValues({ ...values,  [ name ]: newValue })
        setErrors({ ...errors,  [ name ]: '' })
    }

    const setError = (name: string, newValue: string) => {
        setErrors({ ...errors, [ name ]: newValue })
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
         } else if(name === 'confirmPassword') {
            if(value.length < 8) {
                return 'Too short... (8chr)'
            } else if(value.length > 18) {
                return 'Too long... (20chr)'
            } else return ''
         } else if(name === 'username') {
            if(value.length < 3) {
                return 'Too short... (3chr)'
            } else if(value.length > 20) {
                return 'Too long... (20chr)'
            } else return ''
         } else if(name === 'code') {
            if(value.length !== 6) {
                return 'Code must be 6 characters long'
            } else return ''
         }
    }

    const verifyValidity = () => {
        const newErrors: any = {}
        Object.keys(values).forEach((key: string) => {
            newErrors[key] = validate(key, values[key])
        })
        setErrors(newErrors)
    }

    useEffect(() => {
        if(serverErrors?.email?.length > 0 || serverErrors?.password?.length > 0 || serverErrors?.both?.length > 0 || serverErrors?.fullError?.length > 0 || serverErrors?.username?.length > 0 || serverErrors?.confirmPassword?.length > 0) {
            setErrors(serverErrors)
        }
    }, [ serverErrors, setErrors ])


    return { values, errors, setField, verifyValidity, setError }
}

export default useFormHandler;