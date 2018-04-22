import {store} from '../store.js'
import randomSearchResult from '../managers/random-search-manager.js'

export default function randomChoiceAction(){
    let result = randomSearchResult()
    store.dispatch({type: "UPDATE_SEARCH_STRING",payload: result})
    store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})    
}