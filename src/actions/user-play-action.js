export default function userPlayAction(url,history){
    history.push("/play?url="+url)    
    console.log("will play " + url)
}
