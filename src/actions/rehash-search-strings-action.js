import {store} from '../store.js'

//QQQQ maybe this file shouldn't be an "action"

export default function makeHashTagDict(){
    var tits = store.getState().database.mathObjects.map(x=>x.associatedTitles)
    var hashes = store.getState().database.mathObjects.map(x=>x.hashTag)

    var dict = []
    
    for (var i = 0; i < tits.length; i++) { 
        var title = tits[i].split("$")[1] //QQQQ this is just one title
        //dict.set(title,hashes[i])
        dict.push(title)//  {key: title,
                  //  value: hashes[i]})
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