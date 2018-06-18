import {store} from '../store.js'

//QQQQ maybe this file shouldn't be an "action"

export default function makeHashTagDict(){
    var tits = store.getState().database.mathObjects.map(x=>x.associatedTitles)
    var hashes = store.getState().database.mathObjects.map(x=>x.hashTag)

    var dict = {}
    
    for (var i = 0; i < tits.length; i++) { 
        var titles = tits[i].split("$")
        titles = titles.filter(word => {return (word !== "") && (word !== ",") && (word !== "~")})
        for(var k=0; k< titles.length;k++){
            dict[titles[k]] = hashes[i];
        }
    }
    return dict
}


export function makeLowCaseHashTagDict(){
    var tits = store.getState().database.mathObjects.map(x=>x.associatedTitles)
    var hashes = store.getState().database.mathObjects.map(x=>x.hashTag)

    var dict = {}
    
    for (var i = 0; i < tits.length; i++) { 
        var titles = tits[i].split("$")
        titles = titles.filter(word => {return (word !== "") && (word !== ",") && (word !== "~")})
        for(var k=0; k< titles.length;k++){
            dict[titles[k].toLowerCase()] = hashes[i];
        }
    }
    return dict
}

export function makeMathObjectTitleDict(){
    var tits = store.getState().database.mathObjects.map(x=>x.associatedTitles)
    var hashes = store.getState().database.mathObjects.map(x=>x.hashTag)

    var dict = {}

    for(var i=0;i<hashes.length;i++){
        dict[hashes[i]] = tits[i].split("$")[1]
    }
    return dict
}

export function makeSnippetDict(){
    let snippets = store.getState().database.snippets;
    let dict = {}
    for(var i=0; i<snippets.length;i++){
        dict[snippets[i].hashTags] = snippets[i].body;
    }
    return dict
}

export function makeSnippetImageDict(){
    let snippets = store.getState().database.snippets;
    let dict = {}
    for(var i=0; i<snippets.length;i++){
        dict[snippets[i].hashTags] = snippets[i].imageURL;
    }
    return dict
}