import {combineReducers} from 'redux'
import {autoCompleteForString,cleanSearchString,displayResultsOfSearchResults,hashTagOfString} from './managers/text-search-manager.js'
import startCloudPullAction from './actions/start-cloud-pull-action.js'
import {localRecord, recordsOfHashTag, snippetsOfHashTag} from './managers/records-manager.js';
//import {makeImageDictionary} from './managers/image-manager.js'
import { routerReducer } from 'react-router-redux'
import makeHashTagDict,{makeSnippetDict,makeSnippetImageDict} from './actions/rehash-search-strings-action.js'

function createVideoProgressDict(videoProgressDict, videoId, seconds) {
    let newProgressDict = {...videoProgressDict}
    newProgressDict[videoId] = seconds
    return newProgressDict
}

function nextCounter(counter){
    // console.log("counter " + counter)
    return counter === 3 ? 0 : counter + 1
}

const user = (state = {}, actions) => {
    switch (actions.type) {
        case "RESET_USER_STORE":
            return {
                ...state,
                searchTypingInProgress: false,
                searchString: "",
                currentHashTag: "",
                currentSearchResults: {},
                displaySearchResults: [],
                autoCompleteList: [],
                videoProgressDict: {},
                isAndroid: "Android" in window,
                betaPopUpCounter: 0,
            }
        case "USER_HOME_ACTION": //QQQQ not using it now
            let tempCleanString = cleanSearchString("Home")
            return {
                ...state,
                rawSearchString: tempCleanString,
                cleanSearchString: tempCleanString, //QQQQ what for?
                autoCompleteList: autoCompleteForString(tempCleanString),
                betaPopUpCounter: nextCounter(state.betaPopUpCounter)
            }
        case "USER_SEARCH_IS_TYPING":
            let tempCleanString2 = cleanSearchString(actions.payload.value)
            return {
                ...state,
                searchTypingInProgress: true,
                cleanSearchString: tempCleanString2, //QQQQ what for?
                autoCompleteList: autoCompleteForString(tempCleanString2),
            }
        case "USER_SEARCH_DONE_TYPING":
            return {
                ...state,
                searchTypingInProgress: false
            }
        case "UPDATE_SEARCH_STRING": //QQQQ this is used also for surprise and for home (and mol).... fix
            let cleanString = cleanSearchString(actions.payload)
            return{
                ...state,
                rawSearchString: actions.payload,
                cleanSearchString: cleanString, //QQQQ what for?
                autoCompleteList: autoCompleteForString(cleanString)
            }
        case "UPDATE_HASH_TAG":
            return{
                ...state,
                currentHashTag: hashTagOfString(state.cleanSearchString),
            }
        case "UPDATE_SEARCH_RESULTS":
            return{
                ...state,
                currentSearchResults: recordsOfHashTag(state.currentHashTag),
            }
        case "UPDATE_DISPLAY_RESULTS":
            return{
                ...state,
                displaySearchResults: displayResultsOfSearchResults(state.currentSearchResults,
                                                                    state.currentHashTag),
                betaPopUpCounter: nextCounter(state.betaPopUpCounter)

            }
        case "USER_START_WATCH":
            return{
                ...state
            }
        case "USER_STOP_WATCH":
            return{
                ...state,
                videoProgressDict: createVideoProgressDict(state.videoProgressDict, actions.payload.videoId, actions.payload.currentTime),
            }
        case "USER_PLAYER_PLAY":
            return {
                ...state,
                videoProgressDict: createVideoProgressDict(state.videoProgressDict, actions.payload.videoId, actions.payload.currentTime),
                playing: true,
                betaPopUpCounter: nextCounter(state.betaPopUpCounter)
            }
        case "USER_PLAYER_PAUSE":
            return {
                ...state,
                videoProgressDict: createVideoProgressDict(state.videoProgressDict, actions.payload.videoId, actions.payload.currentTime),
                playing: false
            }
        case "USER_PLAYER_END":
            return {
                ...state,
                videoProgressDict: createVideoProgressDict(state.videoProgressDict, actions.payload.videoId, actions.payload.currentTime),
                playing: false
            }
        case "USER_PLAYER_AT":
            return {
                ...state,
                videoProgressDict: createVideoProgressDict(state.videoProgressDict, actions.payload.videoId, actions.payload.currentTime)
            }
        default:
            return state;
        }
}

const database = (state = {records: []}, actions) => {
    switch (actions.type) {
        case "RESET_DATABASE_STORE":
            return {
                ...state,
                mathObjects: [],
                hashTagDict: [],
                mathObjectLinks: [],
                snippetDict: {},
                snippetImageDict:{},
                videos: [],
                featuredURLs: [],
                snippets: [],
                mathObjectsFetchInProgress: true,
                mathObjectLinksFetchInProgress: true,
                videosInProgress: true,
                featuredURLsInProgress: true,
                snippetsFetchInProgress: true,
            }
        case "FETCH_FULL_PULL_START":
            startCloudPullAction("FULL_PULL")
            return{
                ...state,
                mathObjectsFetchInProgress: true,
                mathObjectLinksFetchInProgress: true,
                videosInProgress: true,
                featuredURLsInProgress: true,
                snippetsFetchInProgress: true,
            }
        case "FETCH_MATH_OBJECT_START":
            startCloudPullAction("MATH_OBJECT")
            return{
                ...state,
                mathObjectsFetchInProgress: true,
            }
        case "FETCH_MATH_OBJECT_LINK_START":
            startCloudPullAction("MATH_OBJECT_LINK")
            return{
                ...state,
                mathObjectLinksFetchInProgress: true
            }
        case "FETCH_VIDEO_START":
            startCloudPullAction("VIDEO")
            return{
                ...state,
                videosInProgress: true
            }
        case "FETCH_FEATURED_URL_START":
            startCloudPullAction("FEATURED_URL")
            return{
                ...state,
                featuredURLsInProgress: true
            }
        case "FETCH_SNIPPET_START":
            startCloudPullAction("SNIPPET")
            return{
                ...state,
                snippetsFetchInProgress: true
            }
        case "FETCH_MATH_OBJECT_STOP":
            return{
                ...state,
                mathObjectsFetchInProgress: false,
                mathObjects: actions.payload.map((record) => localRecord(record,"MathObject"))
            }
        case "FETCH_MATH_OBJECT_LINK_STOP":
            return{
                ...state,
                mathObjectLinksFetchInProgress: false,
                mathObjectLinks: actions.payload.map((record) => localRecord(record,"MathObjectLinks"))
            }
        case "FETCH_VIDEO_STOP":
            let videos = actions.payload.map((record) => localRecord(record,"Video"))
            return{
                ...state,
                videosInProgress: false,
                videos: videos,
            }
        case "FETCH_FEATURED_URL_STOP":
            return{
                ...state,
                featuredURLsInProgress: false,
                featuredURLs: actions.payload.map((record) => localRecord(record,"FeaturedURL"))
            }
        case "FETCH_SNIPPET_STOP":
            return{
                ...state,
                snippetsFetchInProgress: false,
                snippets: actions.payload.map((record) => localRecord(record,"Snippet"))
            }
        case "REHASH_SEARCH_STRINGS":
            return{
                ...state,
                hashTagDict: makeHashTagDict(),
            }
        case "REHASH_SNIPPET_STRINGS":
            return{
                ...state,
                snippetDict: makeSnippetDict(),
                snippetImageDict: makeSnippetImageDict()
            }            
        default:            
            return state;
    }
}

const reducers = combineReducers({database, user, router: routerReducer})

export default reducers;
