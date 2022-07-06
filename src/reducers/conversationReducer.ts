const INITIAL_STATE = {
    messages: {},
    total: {},
    lastMessages: {},
    nrMessages: {},
    nrMessagesLoadings: {}
}

export enum CONVERSATION_ACTIONS {
    GET_INITIAL_MESSAGES = 'GET_INITIAL_MESSAGES',
    RECEIVE_NEW_MESSAGE = 'RECEIVE_NEW_MESSAGE',
    GET_PREVIOUS_MESSAGES = 'GET_PREVIOUS_MESSAGES',
    LAST_MESSAGE = 'LAST_MESSAGE',
    SEEN_LAST_MESSAGE = 'SEEN_LAST_MESSAGE',
    ADD_NR_MESSAGE = 'ADD_NR_MESSAGE',
    DELETE_NR_MESSAGE = 'DELETE_NR_MESSAGE'
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
                messages: (state.messages[ action.payload.id ] && state.messages[ action.payload.id ].length > 0) ? { ...state.messages, [ action.payload.id ]: [ ...state.messages[ action.payload.id ], action.payload.newMessage ] } : { ...state.messages },
                total: { ...state.total, [ action.payload.id ]: state.total[ action.payload.id ] + 1 },
                lastMessages: { ...state.lastMessages, [ action.payload.id ]: { message: action.payload.newMessage.text, seen: action.payload.newMessage.seen.includes(action.payload.userId) ? true : false, totalUnseen: (action.payload.email !== action.payload.newMessage.senderEmail) ? (state.lastMessages[ action.payload.id ].totalUnseen || 0) + 1 : state.lastMessages[ action.payload.id ].totalUnseen } }
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

            action.payload.data.forEach((mess: { id: string, message: string, seen: boolean, totalUnseen: number }) => obj[mess.id] = { message: mess.message, seen: mess.seen, totalUnseen: mess.totalUnseen })

            return {
                ...state,
                lastMessages: { ...state.lastMessages, ...obj }
            }
        }
        case CONVERSATION_ACTIONS.SEEN_LAST_MESSAGE: {
            return {
                ...state,
                lastMessages: { ...state.lastMessages, [ action.payload.id ]: { ...state.lastMessages[ action.payload.id ], seen: false, totalUnseen: 0 } }
            }
        }
        case CONVERSATION_ACTIONS.ADD_NR_MESSAGE: {
            return {
                ...state,
                nrMessages: { ...state.nrMessages, [ action.payload.conversationId ]:
                     (state.nrMessages[ action.payload.conversationId ] && state.nrMessages[ action.payload.conversationId ].length > 0) ? [ 
                        ...state.nrMessages[ action.payload.conversationId ], { 
                            messageId: action.payload.id, text: action.payload.text, date: action.payload.date, id: 2, senderEmail: action.payload.email, media: action.payload.media 
                        } 
                    ] :
                        [
                            { 
                            messageId: action.payload.id, text: action.payload.text, date: action.payload.date, id: 2, senderEmail: action.payload.email, media: action.payload.media 
                            } 
                        ]
                },
                nrMessagesLoadings: { ...state.nrMessagesLoadings, [ action.payload.conversationId ]: 
                    (state.nrMessagesLoadings[ action.payload.conversationId ] && state.nrMessagesLoadings[ action.payload.conversationId ].length > 0) ? [ 
                        ...state.nrMessagesLoadings[action.payload.conversationId], { 
                            active: true, messageId: action.payload.id 
                        } 
                    ]  : [
                        [
                            { 
                            active: true, messageId: action.payload.id 
                            } 
                        ]
                    ]
                }
            }
        }
        case CONVERSATION_ACTIONS.DELETE_NR_MESSAGE: {
            const objM: any = {}
            const objL: any = {}


            
            Object.keys(state.nrMessages).forEach((conv: any) => {
                if(conv === action.payload.conversationId && state.nrMessages[ conv ]) {
                    state.nrMessages[ conv ].forEach((m: any) =>  { 
                        if(m.messageId !== action.payload.id) {     
                                    objM[ conv ] = (objM[ conv ] && objM[ conv ].length > 0) ? [ ...objM[ conv ], m ] : [ m ] 
                                } 
                            } 
                        )
                    } else {
                        objM[ conv ] = state.nrMessages[ conv ]
                    }
                }
            )

            
            Object.keys(state.nrMessagesLoadings).forEach((conv: any) => {
                    if(conv === action.payload.conversationId && state.nrMessagesLoadings[ conv ]) {
                            state.nrMessagesLoadings[ conv ].forEach((m: any) =>  { 
                                if(m.messageId !== action.payload.id) {     
                                    objM[ conv ] = (objM[ conv ] && objM[ conv ].length > 0) ? [ ...objM[ conv ], m ] : [ m ] 
                                } 
                            } 
                        )
                    } else {
                        objM[ conv ] = state.nrMessagesLoadings[ conv ]
                    }
                }
            )
                        
            return {
                ...state,
                nrMessages: objM,
                nrMessagesLoadings: { ...objL }
            }
        }
        default: {
            return state
        }
    }
}


export default reducer;