import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

import rootReducer from '../reducers/index'


const middleware = ReduxThunk

const createStoreConst = () => {
    let store = createStore(rootReducer, undefined, applyMiddleware(middleware))
    let persistor = persistStore(store)
    return {persistor, store}
}

export default createStoreConst;