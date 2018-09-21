import {ourStore} from '../store.js'

export function youtubeIdToEpsilonID(id){
    var temp = id.toLowerCase().replace("_","e").replace("-","e")
    return temp.substring(5,11)
}