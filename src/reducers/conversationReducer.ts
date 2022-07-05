const INITIAL_STATE = {
    messages: {},
    total: {},
    lastMessages: {}
}

export enum CONVERSATION_ACTIONS {
    GET_INITIAL_MESSAGES = 'GET_INITIAL_MESSAGES',
    RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE',
    GET_PREVIOUS_MESSAGES = 'GET_PREVIOUS_MESSAGES',
    LAST_MESSAGE = 'LAST_MESSAGE'
}


const reducer = (state: any = INITIAL_STATE, action: any) => {
    switch(action.type) {
        case CONVERSATION_ACTIONS.GET_INITIAL_MESSAGES: {
            return {
                ...state,
                messages: { ...state.messages, [ action.payload.id ]: action.payload.messages },
                total: { ...state.total,  [ action.payload.id ]: action.payload.total }
            }
        }
        case CONVERSATION_ACTIONS.RECEIVE_NEW_MESSAGE: {
            return {
                ...state,
                messages: { ...state.messages, [ action.payload.id ]: [ ...state.messages[ action.payload.id ], action.payload.newMessage ] },
                total: { ...state.total, [ action.payload.id ]: state.total[ action.payload.id ] + 1 },
                lastMessages: { ...state.lastMessages, [ action.payload.id ]: action.payload.newMessage.text }
            }
        }
        case CONVERSATION_ACTIONS.GET_PREVIOUS_MESSAGES: {
            return {
                ...state,
                messages: { ...state.messages, [ action.payload.id ]: [ ...action.payload.messages, ...state.messages[ action.payload.id ] ] }
            }
        }
        case CONVERSATION_ACTIONS.LAST_MESSAGE: {
            const obj: any = {}

            action.payload.data.forEach((mess: { id: string, message: string }) => obj[mess.id] = mess.message)

            return {
                ...state,
                lastMessages: { ...state.lastMessages, ...obj }
            }
        }
        default: {
            return state
        }
    }
}


export default reducer;