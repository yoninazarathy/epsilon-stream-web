import {ourStore} from '../store.js'
import {hashTagOfString} from '../managers/text-search-manager'

export default function updateSearchAction(searchString,history){
    let hashTag = hashTagOfString(searchString)
    ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: hashTag}})
    history.push('/topic/' + hashTag.substring(1))

    // console.log(hashTag)
    // console.log(ourStore)


    //console.log("updateSearchAction: " + searchString)
    //QQQQ
    // store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})


    // // console.log("SEARCH: " + searchString )
    //ourStore.dispatch({type: "UPDATE_SEARCH_STRING",payload: searchString})
    // store.dispatch({type: "UPDATE_HASH_TAG",payload: {}})
    // store.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    // store.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})    
}