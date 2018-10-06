import {compose,createStore,applyMiddleware} from 'redux'
import reducers from './reducers.js'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'
//import createHistory from 'history/createBrowserHistory'
import {routerMiddleware } from 'react-router-redux' //QQQQ push

//export const history = createHistory()

const rehashMiddleWare = store => next => action => {
    if(action.type === 'LOAD_DB_COMPLETE'){
        next(action)
        store.dispatch({type: "REHASH_SEARCH_STRINGS",payload:{}})
    }else if(action.type === 'REHASH_SEARCH_STRINGS'){
         next(action)
         ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: '#'+currentTopic}})
         ourStore.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
         ourStore.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})
    }else{
        next(action);
    }
  }


//const historyMiddleware = routerMiddleware(history);

const middleware = applyMiddleware(thunk,logger,rehashMiddleWare)

// export const store = createStore(   reducers,
//                                     undefined,
//                                     compose (middleware,
//                                         autoRehydrate()))
                                       
//         // persistStore(store)




// export default store

//
// The code below came from the redux template of react-static
//

if (typeof window === 'undefined') {
  global.window = {}
}

/* eslint-disable no-underscore-dangle */
export const ourStore = createStore(
  reducers,
    { database:{
        dbIsReady: false,
        dbLoadingInProgress: false,
        lastDBUpdateTime: 0,
        featuredURLs: [],
        mathObjectLinks: [],
        mathObjects: [],
        snippets: [],
        videos: [],
        hashTagDict: [],
        lowCaseHashTagDict: [],
        mathObjectTitleDict: []
      }
      , 
      user: {
        searchTypingInProgress: false,
        searchString: "",
        currentHashTag: "",
        currentSearchResults: {},
        displaySearchResults: [],
        autoCompleteList: [],
        videoProgressDict: {},
        isAndroid: false,
        betaPopUpCounter: 0,
        pageTitle: " Epsilon Stream",
        currentURLforSharing: "https://epsilonstream.com",
      }
    },
    compose(
    middleware,
    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    autoRehydrate()),
)

persistStore(ourStore)

export function isAndroid() {
  return ourStore.getState().user.isAndroid;
}

//QQQQ Global
var currentTopic = ""

export function setCurrentTopic(topic){
  currentTopic = topic
}
