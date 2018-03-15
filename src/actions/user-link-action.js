import {store} from '../store.js'

export default function userLinkAction(searchTitle){//search,history){
    store.dispatch({type: "UPDATE_SEARCH_STRING",payload: searchTitle})
    store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})   
}