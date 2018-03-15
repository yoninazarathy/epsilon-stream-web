import {createStore,applyMiddleware, combineReducers} from 'redux'
import {autoCompleteForString,cleanSearchString,displayResultsOfSearchResults,hashTagOfString} from './managers/text-search-manager.js'
import startCloudPullAction from './actions/start-cloud-pull-action.js'
import {localRecord, recordsOfHashTag} from './managers/records-manager.js';
import {makeImageDictionary} from './managers/image-manager.js'

import { routerReducer } from 'react-router-redux'

function createVideoProgressDict(videoProgressDict, videoId, seconds) {
    let newProgressDict = {...videoProgressDict}
    newProgressDict[videoId] = seconds
    return newProgressDict
}

const user = (state = {counter: 0}, actions) => {
    switch (actions.type) {
        case "RESET_USER_STORE":
            return {
                ...state,
                counter: 0, //QQQQ temp for learning how to use (delete)
                searchString: "",
                currentHashTag: "",
                currentSearchResults: {},
                displaySearchResults: [],
                autoCompleteList: [],
                videoProgressDict: {}
            }
        case "USER_HOME_ACTION": //QQQQ not using it now
            let tempCleanString = cleanSearchString("Home")
            return {
                ... state,
                rawSearchString: tempCleanString,
                cleanSearchString: tempCleanString, //QQQQ what for?
                autoCompleteList: autoCompleteForString(tempCleanString)
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
                displaySearchResults: displayResultsOfSearchResults(state.currentSearchResults)
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
                playing: true
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
                mathObjectLinks: [],
                videos: [],
                featuredURLs: [],
                mathObjectsFetchInProgress: false,
                mathObjectLinksFetchInProgress: false,
                videosInProgress: false,
                featuredURLsInProgress: false
            }
        case "FETCH_FULL_PULL_START":
            startCloudPullAction("FULL_PULL")
            return{
                ...state,
                fullPullFetchInProgress: true,
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
        case "FETCH_FULL_PULL_STOP":
            return{
                ...state,
                fullPullFetchInProgress: false
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
        default:
            return state;
    }
}

const reducers = combineReducers({database, user, router: routerReducer})

export default reducers;
