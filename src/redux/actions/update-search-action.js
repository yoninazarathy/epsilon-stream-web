import {ourStore} from '../store.js'
import {hashTagOfString} from '../managers/text-search-manager'

export default function updateSearchAction(searchString,history){
    let hashTag = hashTagOfString(searchString)
    ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: hashTag}})
    ourStore.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    ourStore.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})
    if(hashTag !== '#noTag'){   
        history.push('/topic/' + hashTag.substring(1))
    }
}