import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import authReducer from './authReducer'

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: [ '' ]
}


const rootReducer = combineReducers({
    auth: authReducer,
})

export const persistRootReducer = persistReducer(persistConfig, rootReducer)