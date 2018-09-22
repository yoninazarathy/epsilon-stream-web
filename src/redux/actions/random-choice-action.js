import {ourStore} from '../store.js'
import randomSearchResult from '../managers/random-search-manager.js'

export default function randomChoiceAction(history){
    let newHashTag = randomSearchResult().substring(1)
    history.push('/topic/' + newHashTag)
    
    // ourStore.dispatch({type: "UPDATE_HASH_TAG",payload: {hashTagString: newHashTag}})
    // ourStore.dispatch({type: "UPDATE_SEARCH_RESULTS",payload: {}})
    // ourStore.dispatch({type: "UPDATE_DISPLAY_RESULTS",payload: {}})
}