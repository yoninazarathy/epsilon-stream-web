import {ourStore} from '../store.js'
import axios from 'axios'
//QQQQ maybe this file shouldn't be an "action"

export default function loadDbAction(){
    console.log("loadDbAction")
    var time = (new Date()).getTime()
    var lastTime = ourStore.getState().database.lastDBUpdateTime
    // var inProgress = ourStore.getState().data.dbLoadingInProgress
    if(time - lastTime > 1000*30){//30 seconds delay 
        ourStore.dispatch({type: "LOAD_DB_START",payload: {}})
        axios.get('https://s3.amazonaws.com/oneonepsilon-database/database.json'
            //'https://db-cdn.oneonepsilon.net/database.json'
            ).then((res)=>{
            ourStore.dispatch({type: "LOAD_DB_COMPLETE",payload: res.data})
        })
    }
}

export function makeHashTagDict(){
    var tits = ourStore.getState().database.mathObjects.map(x=>x.associatedTitles)
    var hashes = ourStore.getState().database.mathObjects.map(x=>x.hashTag)

    var dict = {}
    
    for (var i = 0; i < tits.length; i++) { 
        var titles = tits[i].split("$")
        titles = titles.filter(word => {return (word !== "") && (word !== ",") && (word !== "~")})
        for(var k=0; k< titles.length;k++){
            dict[titles[k]] = hashes[i];
        }
        //hashtag points to itself
        dict[hashes[i]] = hashes[i] 
        dict[hashes[i].substr(1)] = hashes[i]
    }
    return dict
}

//QQQQ this function is just like the one above only with .toLowerCase() - refactor into a single function
export function makeLowCaseHashTagDict(){
    var tits = ourStore.getState().database.mathObjects.map(x=>x.associatedTitles)
    var hashes = ourStore.getState().database.mathObjects.map(x=>x.hashTag)

    var dict = {}
    
    for (var i = 0; i < tits.length; i++) { 
        var titles = tits[i].split("$")
        titles = titles.filter(word => {return (word !== "") && (word !== ",") && (word !== "~")})
        for(var k=0; k< titles.length;k++){
            dict[titles[k].toLowerCase()] = hashes[i];
        }
        //hashtag points to itself
        dict[hashes[i].toLowerCase()] = hashes[i] 
        dict[hashes[i].substr(1).toLowerCase()] = hashes[i]
    }
    return dict
}

export function makeMathObjectTitleDict(){
    var tits = ourStore.getState().database.mathObjects.map(x=>x.associatedTitles)
    var hashes = ourStore.getState().database.mathObjects.map(x=>x.hashTag)

    var dict = {}

    for(var i=0;i<hashes.length;i++){
        dict[hashes[i]] = tits[i].split("$")[1]
    }
    return dict
}

export function makeSnippetDict(){
    let snippets = ourStore.getState().database.snippets;
    let dict = {}
    for(var i=0; i<snippets.length;i++){
        dict[snippets[i].hashTags] = snippets[i].body;
    }
    return dict
}

export function makeSnippetImageDict(){
    let snippets = ourStore.getState().database.snippets;
    let dict = {}
    for(var i=0; i<snippets.length;i++){
        dict[snippets[i].hashTags] = snippets[i].imageURL;
    }
    return dict
}