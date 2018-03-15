import {store} from '../store.js'

export default function updateSearchAction(searchString){
    // console.log("SEARCH: " + searchString )
    store.dispatch({type: "UPDATE_SEARCH_STRING",payload: searchString})
    store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})    
}