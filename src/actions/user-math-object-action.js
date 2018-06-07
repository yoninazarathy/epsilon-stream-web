import {store} from '../store.js'

export default function userMathObjectAction(mathObject){
    console.log("userMathObjectAction  " + mathObject)
    store.dispatch({type: "UPDATE_HASH_TAG",payload: mathObject})
    store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})    
}