import {store} from '../store.js'

export default function userSnippetAction(snippetId,history){
    history.push("/snippet?mo="+snippetId)
    // console.log("history:   ")
    // console.log(history)
    //console.log("will watch " + vidId)
    //store.dispatch({type: "USER_START_WATCH",payload:{videoId: vidId}})    
}
