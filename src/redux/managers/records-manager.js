import {ourStore} from '../store.js'
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
                associatedTitlesNew: x(fi.associatedTitles.value),
                associatedTitles: fi.associatedTitles.value,
                hashTag: fi.hashTag.value,
                notes: "notes"
            }
        case "MathObjectLinks":
            return {
                type: type,
                hashTags: ('hashTags' in fi) ? fi.hashTags.value.split(',') : "NONE", //QQQQ do this type of thing everywhere with an exception
                imageKey: fi.imageKey.value,
                imageURL: typeof(fi.imageURL) !== 'undefined' ? fi.imageURL.value : "",
                ourTitle: fi.ourTitle.value,
                ourTitleDetail: fi.ourTitleDetail.value,
                searchTitle: fi.searchTitle.value,
                avoided: ('avoidPlatforms' in fi) ? fi.avoidPlatforms.value : "",
                displaySearchPriority: typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : -100000,
                hashTagPriorities: typeof(fi.hashTagPriorities) !== 'undefined' ?
                                                    fi.hashTagPriorities.value  : "",             } 
        case "Video":
            return {
                type: type,
                hashTags: fi.hashTags.value.split(','),
                durationSec: fi.durationSec.value,
                imageURL: 'https://i.ytimg.com/vi/'+fi.youtubeVideoId.value+'/mqdefault.jpg', //fi.imageURL.value, // QQQQ do this properly plz
                ourTitle: fi.ourTitle.value,
                provider: fi.channelKey.value, //name change
                youtubeVideoId: fi.youtubeVideoId.value,
                displaySearchPriority: typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : -100000,
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
                imageURL: fi.imageURL.value,
                ourTitle: fi.ourTitle.value,
                provider: fi.provider.value,
                urlOfItem: fi.urlOfItem.value,
                featureType: featureType,
                hashTags: fi.hashTags.value.split(','),   
                displaySearchPriority: typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : -100000,
                hashTagPriorities: typeof(fi.hashTagPriorities) !== 'undefined' ?
                                                    fi.hashTagPriorities.value  : "",          
            } 
        case "Snippet":
            return {
                type: type,
                body: fi.body.value,
                hashTags: fi.hashTags.value.split(','),
                ourTitle: fi.title.value,   
                imageURL: typeof(fi.imageURL) !== 'undefined' ?
                                fi.imageURL.value  : "",                                           
            } 
        default:
    }
}

export function recordsOfHashTag(hashTag){
    if(hashTag === "#noTag"){
        return {videos: [],
                featuredURLs: [],
                mathObjectLinks: [],
                snippets: []}
    }

    let matches =  {
        videos: videosOfHashTag(hashTag),
        featuredURLs: featuredURLsOfHashTag(hashTag),
        mathObjectLinks: mathObjectLinksOfHashTag(hashTag),
        snippets: snippetsOfHashTag(hashTag)
    }
    return matches
}

function videosOfHashTag(hashTag){ 
    let vids = ourStore.getState().database.videos
    return vids.filter( (el) => {
          return el.hashTags.includes(hashTag)
         });
}

function featuredURLsOfHashTag(hashTag){
    let furls = ourStore.getState().database.featuredURLs
    return furls.filter( (el) => {
          return el.hashTags.includes(hashTag)
         });
}

function mathObjectLinksOfHashTag(hashTag){
    let mols = ourStore.getState().database.mathObjectLinks
    //let mols2 = $.grep(mols,(mol) => {
      //  return !mol.avoided.includes("web") //QQQQ
    // })
    return mols.filter( (el) => {
        return el.hashTags.includes(hashTag)
       });
}

export function snippetsOfHashTag(hashTag){ 
    let snips = ourStore.getState().database.snippets
    return snips.filter( (el) => {
        return el.hashTags.includes(hashTag)
       });
}