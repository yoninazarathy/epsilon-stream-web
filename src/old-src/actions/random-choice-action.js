import {store} from '../store.js'
import randomSearchResult from '../managers/random-search-manager.js'
import {push} from 'react-router-redux'

export default function randomChoiceAction(){
    let result = randomSearchResult()

    //QQQQ this code is duplicated (also in search-bar and maybe elsewhwere - consolidate)
    let query = result.toLowerCase().split(' ').join('+');
    store.dispatch(push('/search?q='+query))

    store.dispatch({type: "UPDATE_SEARCH_STRING",payload: result})
    store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})
}