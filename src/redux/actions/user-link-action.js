import {store} from '../store.js'
import {push} from 'react-router-redux'

export default function userLinkAction(searchTitle){//search,history){

    console.log("user link: " + searchTitle)

    //QQQQ this code is duplicated (also in search-bar and maybe elsewhwere - consolidate)
    let query = searchTitle.toLowerCase().split(' ').join('+');
    store.dispatch(push('/search?q='+query))
    
    store.dispatch({type: "UPDATE_SEARCH_STRING",payload: searchTitle})
    store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})   
}