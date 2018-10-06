import {ourStore} from '../store.js'

export default function clearSearchStringAction(){
    console.log("clearSearchStringAction()")

    ourStore.dispatch({type: "UPDATE_SEARCH_STRING",payload: ""})
    // ourStore.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    // ourStore.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})
}