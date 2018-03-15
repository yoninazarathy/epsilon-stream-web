import {compose,createStore,applyMiddleware} from 'redux'
import reducers from './reducers.js'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

export const history = createHistory()

const historyMiddleware = routerMiddleware(history)

const middleware = applyMiddleware(thunk, logger, historyMiddleware)

export const store = createStore(   reducers,
                                    undefined, 
                                    compose(middleware,
                                        autoRehydrate()))
                                        persistStore(store)

store.dispatch({type: "RESET_DATABASE_STORE",payload:{}})
store.dispatch({type: "RESET_USER_STORE",payload:{}})

export default store
