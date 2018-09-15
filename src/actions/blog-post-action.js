import {store} from '../store.js'
import randomSearchResult from '../managers/random-search-manager.js'
import {push} from 'react-router-redux'

export default function blogPostAction(){
    store.dispatch({type: "UPDATE_SEARCH_STRING",payload: "square"})
    store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})
}