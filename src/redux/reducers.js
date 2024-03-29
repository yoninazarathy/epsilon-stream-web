import {combineReducers} from 'redux'
import {autoCompleteForString,cleanSearchString,displayResultsOfSearchResults,hashTagOfString} from './managers/text-search-manager.js'
import startCloudPullAction from './actions/start-cloud-pull-action.js'
import {localRecord, recordsOfHashTag, snippetsOfHashTag} from './managers/records-manager.js';
import { routerReducer } from 'react-router-redux'
import {loadDb,makeHashTagDict,makeLowCaseHashTagDict,makeMathObjectTitleDict} from './actions/reload-db-action'
import {ourStore} from './store'
import jQuery from 'jquery'

function createVideoProgressDict(videoProgressDict, videoId, seconds) {
    let newProgressDict = {...videoProgressDict}
    newProgressDict[videoId] = seconds
    return newProgressDict
}

function nextCounter(counter){
    //console.log("counter " + counter)
    return counter >= 10 ? 0 : counter + 1
}

const user = (state = {}, actions) => {
    switch (actions.type) {
        case "LOAD":
            return {
                ...state,
                appLoaded: true
            }
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
                isAndroid: "Android" in window, //this set in the AndroidStudio for the Android App
                isIOSEstream: "iOSApp" in window,
                betaPopUpCounter: 0,
                pageTitle: 'Epsilon Stream'
            }
        case "USER_HOME_ACTION": //QQQQ not using it now
            let tempCleanString = cleanSearchString("Home")
            return {
                ...state,
                rawSearchString: tempCleanString,
                cleanSearchString: tempCleanString, //QQQQ what for?
                autoCompleteList: autoCompleteForString(tempCleanString),
                betaPopUpCounter: nextCounter(state.betaPopUpCounter),
                pageTitle: 'Epsilon Stream Home'
            }
        case "USER_SEARCH_IS_TYPING":
            let tempCleanString2 = cleanSearchString(actions.payload.value)
            return {
                ...state,
                searchTypingInProgress: true,
                cleanSearchString: tempCleanString2, //QQQQ what for?
                autoCompleteList: autoCompleteForString(tempCleanString2),
                pageTitle: 'Key in your search'
            }
        case "USER_SEARCH_DONE_TYPING":
            return {
                ...state,
                searchTypingInProgress: false,
                pageTitle: 'Epsilon Stream'
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
                currentHashTag: actions.payload.hashTagString,
                autoCompleteList: [],
            }
            // let hashTag = ''
            // if(jQuery.isEmptyObject(actions.payload)){
            //     hashTag = hashTagOfString(state.cleanSearchString)
            // }else{
            //     hashTag = actions.payload
            // }
            // return{
            //     ...state,
            //     currentHashTag: hashTag,
            //     pageTitle: store.getState().database.mathObjectTitleDict[hashTag]
            // }
        case "UPDATE_SEARCH_RESULTS":
            return{
                ...state,
                currentSearchResults: recordsOfHashTag(state.currentHashTag),
                pageTitle: ourStore.getState().database.mathObjectTitleDict[state.currentHashTag]
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
                ...state,
                pageTitle: ''
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
        case "SET_PAGE_TITLE":
            return{
                ...state,
                pageTitle: actions.payload,
            }
        case "SET_ENVIRONMENT":
            return {
                ...state,
                environment: actions.payload,
                environment_android_app: actions.payload === "android-app",
                environment_ios_app: actions.payload === "ios-app",
                environment_web: actions.payload === "web",
            }
        default:
            return state;
        }
}

const database = (state = {records: []}, actions) => {
    switch (actions.type) {
        case "REHASH_SEARCH_STRINGS":
            return{
                ...state,
                hashTagDict: makeHashTagDict(),
                lowCaseHashTagDict: makeLowCaseHashTagDict(),
                mathObjectTitleDict: makeMathObjectTitleDict()
            }
        case "LOAD_DB_START":
            return{
                ...state,
                dbLoadingInProgress: true,
                lastDBUpdateTime: (new Date()).getTime(),
            }
        case "LOAD_DB_COMPLETE":
            return{
                ...state,
                dbIsReady: true,
                dbLoadingInProgress: false,
                // lastDBUpdateTime: (new Date()).getTime(),
                featuredURLs: actions.payload.featuredURLs,
                mathObjectLinks: actions.payload.mathObjectLinks,
                mathObjects: actions.payload.mathObjects,
                snippets: actions.payload.snippets,
                videos: actions.payload.videos,
                errorState: undefined //indicates there is no error
                }
        case "LOAD_DB_ERROR":
            return{
                ...state,
                errorState: actions.payload + ' check your network or firewall or contact info@oneonepsilon.com for support.'
                }
        default:            
            return state;
    }
}

const reducers = combineReducers({database, user, router: routerReducer})

export default reducers;
