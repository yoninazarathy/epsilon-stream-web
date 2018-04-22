import {
    store
} from '../store.js'
//import $ from 'jquery'

export function cleanSearchString(searchString) {
    return searchString
}

export function displayResultsOfSearchResults(searchResults,snippet) {
    let ourVideoProgressDict = store.getState().user.videoProgressDict;
    //let ourVideoDict = store.getState().database.videos;
    return [  
     /*   {
            type: "EpsilonSnippet",
            image: null,
            title: snippet,
            subtile: null,
            link: null,
            action: undefined
        }
        ,*/
        ...searchResults.videos.map((sr) => {
            return {
                type: sr.type,
                image: sr.imageURL,
                title: sr.ourTitle,
                subtitle: sr.provider + ', ' + ((sr.durationSec < 60) ? '1' : Math.round(sr.durationSec / 60)) + ' min',
                link: sr.youtubeVideoId,
                action: undefined,
                completed: (ourVideoProgressDict[sr.youtubeVideoId] / sr.durationSec) || 0
            }
        }),
        ...searchResults.featuredURLs.map((sr) => {
            return {
                type: sr.type,
                image: sr.imageURL,
                title: sr.ourTitle,
                subtitle: sr.provider,
                link: sr.urlOfItem,
                action: undefined
            }
        }),
        ...searchResults.mathObjectLinks.map((sr) => {
            return {
                type: sr.type,
                image: sr.imageURL,
                title: sr.ourTitle,
                subtitle: sr.provider,
                link: sr.searchTitle,
                action: undefined
            }
        })
    ]
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
    console.log(hashTag)
    return hashTag//"#explodingDots"//hashTag
}

export function autoCompleteForString(s) {
    return store.getState().database.hashTagDict
    //return store.getState().database.mathObjects.map((m) => m.associatedTitlesNew.map((g) => g.find((i) => i.toLowerCase().includes(s.toLowerCase()))).filter((n) => n != undefined))
}
