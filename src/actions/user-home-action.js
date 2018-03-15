import {store} from '../store.js'

export default function userHomeAction(){
    //QQQQ note used store.dispatch({type: "USER_HOME_ACTION",payload:{}})   
    store.dispatch({type: "UPDATE_SEARCH_STRING",payload: "Epsilon Stream Home"})
    store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})   
}