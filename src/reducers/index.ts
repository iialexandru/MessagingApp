import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import authReducer from './authReducer'
import socialReducer from './socialReducer'
import conversationReducer from './conversationReducer'

const authPersistConfig = {
    key: 'auth',
    storage
}

const socialPersistConfig = {
    key: 'social',
    storage
}

//@ts-ignore
const authPersist = persistReducer(authPersistConfig, authReducer)

//@ts-ignore
const socialPersist = persistReducer(socialPersistConfig, socialReducer)

const rootReducer = combineReducers({
    auth: authPersist,
    social: socialPersist,
    conversation: conversationReducer
})

// export const persistRootReducer = persistReducer(persistConfig, rootReducer)

export default rootReducer