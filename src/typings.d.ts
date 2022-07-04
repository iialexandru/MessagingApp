export interface TextMessage {
    text: string;
    date: string;
    index: 1 | 2;
    senderEmail: string;
    media?: string;
}

export type Section = 'Messages' | 'Social' | 'Profile' | 'None'

export interface AuthPropsReducer {
    loggedIn: boolean;
    loading: boolean;
    serverErrors: { 
        email: string;
        password: string;
        username: string;
        code: string;
        confirmPassword: string;
        fullError: string;
    }
    defaultState: (dispatch: any) => void
    login: (dispatch: any) => Promise<void>;
    register: (dispatch: any) => Promise<void>;
    codeRegister: (dispatch: any) => Promise<void>;
    forgotPassword: (dispatch: any) => Promise<void>;
    completeForgotPassword: (dispatch: any) => Promise<void>
} 


export interface FormHandler {
    values: {
        email: string;
        password: string;
        username: string;
        code: string;
        confirmPassword: string;
    }
    errors: {
        email: string;
        password: string;
        username: string;
        code: string;
        confirmPassword: string;
        fullError: string;
        both: string;
    }
    setField: (name: string, newValue: string) => void;
    setError: (name: string, newValue: string) => void;
    verifyValidity: () => void;
}

export type initialValues = {
    initialValues: {
        email: string;
        password: string;
        username: string;
        code: string;
        confirmPassword: string;
    }
}