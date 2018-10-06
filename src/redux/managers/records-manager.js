import {ourStore} from '../store.js'
import $ from 'jquery'

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
                displaySearchPriority: 50000+ (typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : 0),
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
                displaySearchPriority: -20000+ (typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : 0),
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
                displaySearchPriority: 10000+ (typeof(fi.displaySearchPriority) !== 'undefined' ?
                                                    fi.displaySearchPriority.value  : 0),
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

function normalizePris(arr,startPri){
    let minP = Math.min(...arr.map(x => x.displaySearchPriority))
    let range = Math.max(...arr.map(x => x.displaySearchPriority)) - minP

    arr.forEach(function(part, index, theArray) {
        theArray[index].displaySearchPriority = startPri + (
                    range !== 0.0 ? (part.displaySearchPriority - minP)/range : 0.0);
      });
}

export function recordsOfHashTag(hashTag){
    console.log("i am here with hashtag = "+hashTag)
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
    
    if(matches.snippets.length > 0){
        normalizePris(matches.snippets,0)
    }

    if(matches.videos.length > 0){
        // console.log("Priorities before:")
        // console.log(matches.videos.map(x=>x.displaySearchPriority))
        normalizePris(matches.videos,10)
        // console.log("Priorities after:")
        // console.log(matches.videos.map(x=>x.displaySearchPriority))
    }

    if(matches.featuredURLs.length > 0){
        // console.log("Priorities before:")
        // console.log(matches.featuredURLs.map(x=>x.displaySearchPriority))
        normalizePris(matches.featuredURLs,20)
        // console.log("Priorities after:")
        // console.log(matches.featuredURLs.map(x=>x.displaySearchPriority))
    }

    if(matches.mathObjectLinks.length > 0){
        normalizePris(matches.mathObjectLinks,30)
    }

    return matches
}

function videosOfHashTag(hashTag){ 
    let vids = ourStore.getState().database.videos
    return vids.filter( (el) => {
          return el.hashTags.map(x => x.toLowerCase()).includes(hashTag.toLowerCase())
         });
}

function featuredURLsOfHashTag(hashTag){
    let furls = ourStore.getState().database.featuredURLs
    return furls.filter( (el) => {
          return el.hashTags.map(x => x.toLowerCase()).includes(hashTag.toLowerCase()) && el.featureType != "Game"
         });
}

function mathObjectLinksOfHashTag(hashTag){
    let mols = ourStore.getState().database.mathObjectLinks
    //let mols2 = $.grep(mols,(mol) => {
      //  return !mol.avoided.includes("web") //QQQQ
    // })
    return mols.filter( (el) => {
        return el.hashTags.map(x => x.toLowerCase()).includes(hashTag.toLowerCase())
       });
}

export function snippetsOfHashTag(hashTag){ 
    let snips = ourStore.getState().database.snippets
    return snips.filter( (el) => {
        return el.hashTags.map(x => x.toLowerCase()).includes(hashTag.toLowerCase())
       });
}