export interface TextMessage {
    text: string;
    date: string;
    index: 1 | 2;
    senderEmail: string;
    media?: string;
    seen?: string;
}

export type Section = 'Messages' | 'Social' | 'None'

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

export interface MessageContainerProps {
    mcRef: any, 
    nrMessages: any, 
    nrMessagesLoadings: any, 
    lastMessages: any, 
    scrollRef: any, 
    globalConversationId: string, 
    seeMessage: any, 
    getInitialMessages: any, 
    getPreviousMessages: any,
    _messages: any, 
    _total: any, 
    conversationId: string, 
    myEmail: string, 
    myUsername: string, 
    userId: string, 
    newContainer: boolean, 
    setNewContainer: Dispatch<SetStateAction<boolean>>, 
    addNotReadyMessage: any;
    blocked: boolean;
} 

export interface CreateMessageProps {
    conversationId: string;
    userId: string;
    addNotReadyMessage: any;
    myEmail: string;
    scrollRef: any;
    nrMessages: any;
    blocked: boolean;
}


export interface MessSectionProps {
    setSection: Dispatch<SetStateAction<Section>>;
    myUsername: string;
    myEmail: string;
    person?: any;
    message: string;
    conversationId: string;
    setConversationId: Dispatch<SetStateAction<any>>
    setNewContainer: Dispatch<SetStateAction<boolean>>
    globalConversationId: string | null;
    seenMessage: boolean;
    totalUnseen: number;
}

 
export interface SocialRedux {
    peopleSearch: any;
    updateFriends: any; 
    psLoading: boolean; 
    loading: boolean;
    friends: any; 
    showPeopleSearch: any; 
    resetPeopleSearch: any;
    showFriendRequests: any; 
    friendRequests: any;
    setConversationId: Dispatch<SetStateAction<string | null>>
}