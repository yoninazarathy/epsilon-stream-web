import Icon from '../assets/icon.png'
import robotIcon from '../assets/OneOnEpsilon-Character.png'
//import store from '../store.js'

export default function getImageForKey(key, type){
    switch(type){
        case 'WATCH':
            return getImageForVideo(key)
        case 'PLAY':
            return getImageForURL(key, type)
        case 'EXPLORE':
            return getImageForExplore(key, type)
        case 'SNIPPET':
            return getImageForSnippet(key, type)
        case 'NO-MATCH':
            return getImageForNoMatch(key, type)
        case 'SEARCHLINK':
            return {src: Icon, alt: "alt"}
        default:
            return null
    }
}

function getImageForVideo(key){
    return {src: key, alt: "alt"}
}

function getImageForExplore(key){
    return {src: key, alt: "alt"}
}

function getImageForSnippet(key){
    return  {src: robotIcon, alt: "alt"}
}

function getImageForNoMatch(key){
    return {src: "https://www.aapelivuorinen.com/p.jpg", alt: "alt"}
}

function getImageForURL(key,type){
    return {src: Icon, alt: "alt"}
}
