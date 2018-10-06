import {ourStore} from '../store.js'
import randomSearchResult from '../managers/random-search-manager.js'

export default function randomChoiceAction(history){
    let newHashTag = randomSearchResult().substring(1)
    history.push('/topic/' + newHashTag)
}