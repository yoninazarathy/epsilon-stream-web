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

        if (typeof document !== 'undefined') {
          if(window.location.pathname === '/' || window.location.pathname.substr(0,7) === '/topic/'){
            if (window.location.pathname === '/') {
              ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: '#homePage'}})
            } else {
              let hashTag = '#'+window.location.pathname.substring(7)
              if(hashTag[hashTag.length-1] === '/'){
                hashTag = hashTag.substring(0,hashTag.length-1)
              }

              ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {
                                hashTagString: hashTag}})
            }
            ourStore.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
            ourStore.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})  
          }
        }

    }else if(action.type === 'REHASH_SEARCH_STRINGS'){
         next(action)
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
        mathObjectTitleDict: [],
        errorState: undefined,
      }
      , 
      user: {
        environment: "unknown",
        environment_android_app: false,
        environment_ios_app: false,
        environment_web: true,
        searchTypingInProgress: false,
        searchString: "",
        currentHashTag: "",
        currentSearchResults: {},
        displaySearchResults: [],
        autoCompleteList: [],
        videoProgressDict: {},
        isAndroid: false,
        isIOSEstream: false,
        betaPopUpCounter: 0,
        pageTitle: " Epsilon Stream",
        currentURLforSharing: "https://epsilonstream.com",
      }
    },
    compose(
    middleware,
    //,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    autoRehydrate()
    ),
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
