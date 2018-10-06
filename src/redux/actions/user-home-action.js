import {ourStore} from '../store.js'
import {push} from 'react-router-redux'

export default function userHomeAction(history){
    ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString:"#homePage"}})
    ourStore.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    ourStore.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})   
    history.push("/home")
}