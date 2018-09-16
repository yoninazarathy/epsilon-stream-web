import {compose,createStore,applyMiddleware} from 'redux'
import reducers from './reducers.js'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
//import createHistory from 'history/createBrowserHistory'
import {routerMiddleware } from 'react-router-redux' //QQQQ push

import axios from 'axios'

 var dbFromServer = require('./database.json')

// function loadDB(){
//   axios.get('https://es-app.com/repo/database.json').then((response)=>{
//     dbFromServer = response.data
//     })
// }

// loadDB()


//export const history = createHistory()


// //QQQQ Consider moving this to another module
// const rehashMiddleWare = store => next => action => {
//     if(action.type === 'FETCH_MATH_OBJECT_STOP'){
//         //console.log(action.payload)
//         next(action)
//         store.dispatch({type: "REHASH_SEARCH_STRINGS",payload:{}})
//     }else if(action.type === 'FETCH_SNIPPET_STOP'){
//         next(action)
//         store.dispatch({type: "REHASH_SNIPPET_STRINGS",payload:{}})
//     }else{
//         next(action);
//     }
//   }


//const historyMiddleware = routerMiddleware(history);

const middleware = applyMiddleware(thunk)
  //, logger)//,rehashMiddleWare)

// export const store = createStore(   reducers,
//                                     undefined,
//                                     compose (middleware,
//                                         autoRehydrate()))
                                       
//         // persistStore(store)


// export function isAndroid() {
//     return store.getState().user.isAndroid;
// }

// export default store

//
// The code below came from the redux template of react-static
//

if (typeof window === 'undefined') {
  global.window = {}
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  {}, // initial state
  //compose(
    middleware
    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // ),
)

//store.dispatch({type: "RESET_DATABASE_STORE",payload:{}})
store.dispatch({type: "RESET_USER_STORE",payload:{}})
store.dispatch({type: "INIT_DATABASE_STORE",payload:{db: dbFromServer}})

/* eslint-enable */