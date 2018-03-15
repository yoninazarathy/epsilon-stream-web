import {store} from '../store.js'

export default function userWatchAction(vidId,history){
    history.push("/watch?v="+vidId)
    console.log("will watch " + vidId)
    store.dispatch({type: "USER_START_WATCH",payload:{videoId: vidId}})    
}
