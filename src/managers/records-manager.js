import store from '../store.js'
import $ from 'jquery'

export function recordToShortString(record){
    switch(record.type){
        case "MathObject":
            return record.hashTag + " ---- " + record.associatedTitles        
        case "MathObjectLinks":
            return record.hashTags + "---->" + record.searchTitle
        case "Video":
            return record.ourTitle +
            " ( " + record.provider + " ) " + 
            "---->" + record.youtubeVideoId
        case "FeaturedURL":
            return  record.ourTitle + "   ( " + 
                    record.provider + " ) -- " +
                    record.featureType
        default:
            return "ERROR"
    }
}

function x(y) {
    //console.log(y)
    return y.split("~").map((g) => g.split(",").map((s) => s.substr(1).slice(0, -1)))
}

export function localRecord(fromRecord,type){
    let fi = fromRecord.fields
    switch(type){
        case "MathObject":
            return {
                type: type,
                /// Aapeli was here...
                //associatedTitles: fi.associatedTitles.value.split("~").map((g) => g.split(",").map((s) => s.substr(1).slice(0, -1))),
                associatedTitlesNew: x(fi.associatedTitles.value),
                associatedTitles: fi.associatedTitles.value,
                hashTag: fi.hashTag.value,
                notes: "notes"//fi.Notes.value
            }
        case "MathObjectLinks":
            return {
                type: type,
                hashTags: ('hashTags' in fi) ? fi.hashTags.value : "NONE", //QQQQ do this type of thing everywhere with an exception
                imageKey: fi.imageKey.value,
                ourTitle: fi.ourTitle.value,
                ourTitleDetail: fi.ourTitleDetail.value,
                searchTitle: fi.searchTitle.value,
                avoided: ('avoidPlatforms' in fi) ? fi.avoidPlatforms.value : "",
                displaySearchPriority: typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : -1000,
                hashTagPriorities: typeof(fi.hashTagPriorities) !== 'undefined' ?
                                                    fi.hashTagPriorities.value  : "",             } 
        case "Video":
            return {
                type: type,
                hashTags: fi.hashTags.value,
                durationSec: fi.durationSec.value,
                imageURL: fi.imageURL.value,
                ourTitle: fi.ourTitle.value,
                provider: fi.channelKey.value, //name change
                youtubeVideoId: fi.youtubeVideoId.value,
                displaySearchPriority: typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : -1000,
                hashTagPriorities: typeof(fi.hashTagPriorities) !== 'undefined' ?
                                                    fi.hashTagPriorities.value  : "", 
                                                
            } 
        case "FeaturedURL":
            let featureType = "undef"
            if(fi.isAppStoreApp.value === 0){
                featureType = fi.typeOfFeature.value
                if(fi.provider.value === "Youtube"){
                    featureType = "Youtube Channel"
                }
            }else{
                featureType = "Game"
            }
            return {
                type: type,
                imageURL: fi.imageURL.value,//"https://es-app.com/assets/"+fi.imageKey.value+".jpg",
                //imageURL: fi.imageURL.value, //derived
                ourTitle: fi.ourTitle.value,
                provider: fi.provider.value,
                urlOfItem: fi.urlOfItem.value,
                featureType: featureType,
                hashTags: fi.hashTags.value,   
                displaySearchPriority: typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : -1000,
                hashTagPriorities: typeof(fi.hashTagPriorities) !== 'undefined' ?
                                                    fi.hashTagPriorities.value  : "",          
            } 
        case "Snippet":
            return {
                type: type,
                body: fi.body.value,
                hashTags: fi.hashTags.value,
                ourTitle: fi.title.value,                                                
            } 
        default:
    }
}

export function snippetOfHashTag(hashTag){
    return "The snippet of " + hashTag + " is here" ;
}

export function recordsOfHashTag(hashTag){
    if(hashTag === "#noTag"){
        return {videos: [],
                featuredURLs: [],
                mathObjectLinks: []}
    }

    let matches =  {
        videos: videosOfHashTag(hashTag),
        featuredURLs: featuredURLsOfHashTag(hashTag),
        mathObjectLinks: mathObjectLinksOfHashTag(hashTag)
    }
    return matches
}

function videosOfHashTag(hashTag){ 
    let vids = store.getState().database.videos
    return $.grep(vids, (vid) => {
        return vid.hashTags.includes(hashTag) //QQQQ bug of form #arc, #arcLength
    })
}

function featuredURLsOfHashTag(hashTag){
    let furls = store.getState().database.featuredURLs
    return $.grep(furls, (furl) => {
        return furl.hashTags.includes(hashTag) //QQQQ bug of form #arc, #arcLength
    })
}

function mathObjectLinksOfHashTag(hashTag){
    let mols = store.getState().database.mathObjectLinks
    let mols2 = $.grep(mols,(mol) => {
        return !mol.avoided.includes("web") //QQQQ
    })
    return $.grep(mols2, (mol) => {
        return mol.hashTags.includes(hashTag) //QQQQ bug of form #arc, #arcLength
    })
}