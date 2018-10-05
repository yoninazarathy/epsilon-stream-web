import {ourStore} from '../store.js'

export default function randomSearchResult(){
    let mos = ourStore.getState().database.mathObjects
    let index = Math.floor(Math.random()*mos.length)
    let hashTag = mos[index].hashTag
    return hashTag
}