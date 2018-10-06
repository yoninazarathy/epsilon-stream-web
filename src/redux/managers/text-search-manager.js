import {ourStore} from '../store.js'

export function cleanSearchString(searchString) {
    return searchString
}

export function displayResultsOfSearchResults(searchResults,currentHashTag) {
    let ourVideoProgressDict = ourStore.getState().user.videoProgressDict;
    //let ourVideoDict = store.getState().database.videos;
    let retVal =  [  
        ...searchResults.snippets.map((sr) =>{
            return{
                type: "EpsilonSnippet",
                image: null,
                title: sr.ourTitle,
                subtile: null,
                link: null,
                action: undefined,
                displayOrder: -Infinity
            }
        })
        ,
        ...searchResults.videos.map((sr) => {
            return {
                type: sr.type,
                image: sr.imageURL,
                title: sr.ourTitle,
                subtitle: sr.provider + ', ' + ((sr.durationSec < 60) ? '1' : Math.round(sr.durationSec / 60)) + ' min',
                link: sr.youtubeVideoId,
                action: undefined,
                completed: (ourVideoProgressDict[sr.youtubeVideoId] / sr.durationSec) || 0,
                displayOrder: calculatePriority(sr.displaySearchPriority,sr.hashTagPriorities,currentHashTag)
            }
        }),
        ...searchResults.featuredURLs.map((sr) => {
            return {
                type: sr.type,
                image: sr.imageURL === "" || sr.imageURL === "znone" ? 'https://es-app.com/assets/expe32.png' : sr.imageURL,
                title: sr.ourTitle,
                subtitle: sr.provider,
                link: sr.urlOfItem,
                action: undefined,
                displayOrder: calculatePriority(sr.displaySearchPriority,sr.hashTagPriorities,currentHashTag)
            }
        }),
        ...searchResults.mathObjectLinks.map((sr) => {
            return {
                type: sr.type,
                image: sr.imageURL,
                title: sr.ourTitle,
                subtitle: sr.ourTitleDetail,
                link: sr.searchTitle,
                action: undefined,
                displayOrder: calculatePriority(sr.displaySearchPriority,sr.hashTagPriorities,currentHashTag)
            }
        })
    ]
    if(retVal.length === 0){
        let searchString = ourStore.getState().user.rawSearchString
        retVal = [
            {
                type:"NO-MATCH",
                image: undefined,
                title: "No match found for " + searchString,
                subtitle: undefined,
                link: undefined,
                action: undefined,
                displayOrder: 0.0// doesn't matter
            }
        ]
    }
    return retVal.sort((a,b) => {return Math.sign(a.displayOrder - b.displayOrder) })
}

export function hashTagOfString(searchString) {
    let htd = ourStore.getState().database.lowCaseHashTagDict
    let cleanString = searchString.toLowerCase().trim()
    let val = htd[cleanString]
    if(val === undefined){
        return "#noTag"
    }else{
        return val;
    }
}

export function autoCompleteForString(s) {
    console.log("yoyo: " + s)
    let sLow = s.toLowerCase()
    let filtered = Object.keys(ourStore.getState().database.hashTagDict).filter((x)=>{return sLow.length >0 && x.toLowerCase().startsWith(sLow)}) 
    // if(filtered.length === 0){
        // return ["No Match"];
    // }else{
        return filtered
    // } 
}


function calculatePriority(displaySearchPriority,hashTagPriorities,currentHashTag){
    // console.log("priority: "+ displaySearchPriority + "    " + hashTagPriorities)
    // console.log(currentHashTag)
    let index = hashTagPriorities.indexOf(currentHashTag)
    if(index === -1){
        // console.log("resolving priority as: " + displaySearchPriority)
        return displaySearchPriority
    }else{
        let afterStr = hashTagPriorities.substr(index + currentHashTag.length + 1) //The +1 is to remove the ":"
        //console.log("AFTER: " + afterStr)
        let pri = parseFloat(afterStr)
        // console.log("resolving priority as: " + pri)
        return pri
    }
}