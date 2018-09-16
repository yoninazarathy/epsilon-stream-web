import {store} from '../store.js'

export default function updateSearchAction(searchString){

    //QQQQ
    store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})

    // console.log("SEARCH: " + searchString )
    store.dispatch({type: "UPDATE_SEARCH_STRING",payload: searchString})
    store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})    
}