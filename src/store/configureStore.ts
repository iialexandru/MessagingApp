import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

import { persistRootReducer } from '../reducers/index'


const middleware = ReduxThunk

const configureStore = () => {
    let store = createStore(persistRootReducer, undefined, applyMiddleware(middleware))
    let persistor = persistStore(store)
    return { persistor, store }
}

export default configureStore;