import {
    store
} from '../store.js'
//import $ from 'jquery'


export function cleanSearchString(searchString) {
    return searchString
}

export function displayResultsOfSearchResults(searchResults,currentHashTag) {
    let ourVideoProgressDict = store.getState().user.videoProgressDict;
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
                image: sr.imageURL,
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
                subtitle: sr.provider,
                link: sr.searchTitle,
                action: undefined,
                displayOrder: calculatePriority(sr.displaySearchPriority,sr.hashTagPriorities,currentHashTag)
            }
        })
    ]
    if(retVal.length === 0){
        let searchString = store.getState().user.rawSearchString
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
    retVal.sort((a,b) => {return a.displayOrder > b.displayOrder })
    return retVal
}

export function hashTagOfString(searchString) {
    let mos = store.getState().database.mathObjects
    let hashTag = "#noTag"
    //QQQQ temporary shit
    for (let i = 0; i < mos.length; i++) {
        let mo = mos[i]
        if (mo.associatedTitles.toLowerCase().includes(searchString.toLowerCase())) {
            hashTag = mo.hashTag
            break
        }
    }
    //console.log(hashTag)
    return hashTag//"#explodingDots"//hashTag
}

export function autoCompleteForString(s) {
    let sLow = s.toLowerCase()
    let filtered = Object.keys(store.getState().database.hashTagDict).filter((x)=>{return x.toLowerCase().includes(sLow)}) 
    // if(filtered.length === 0){
        // return ["No Match"];
    // }else{
        return filtered
    // } 
}


function calculatePriority(displaySearchPriority,hashTagPriorities,currentHashTag){
    //console.log(displaySearchPriority + "    " + hashTagPriorities)
    //console.log(currentHashTag)
    //console.log(hashTagPriorities)
    let index = hashTagPriorities.indexOf(currentHashTag)
    if(index === -1){
        return displaySearchPriority
    }else{
        let afterStr = hashTagPriorities.substr(index + currentHashTag.length + 1) //The +1 is to remove the ":"
        //console.log("AFTER: " + afterStr)
        let pri = parseFloat(afterStr)
        return pri
    }
}