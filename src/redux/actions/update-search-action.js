import {ourStore} from '../store.js'
import {hashTagOfString} from '../managers/text-search-manager'

export default function updateSearchAction(searchString,history){
    let hashTag = hashTagOfString(searchString)
    ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: hashTag}})
    history.push('/topic/' + hashTag.substring(1))
}