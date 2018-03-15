import Icon from '../assets/icon.png'
import store from '../store.js'

export default function getImageForKey(key, type){
    switch(type){
        case 'WATCH':
            return getImageForVideo(key)
        case 'PLAY':
            return getImageForURL(key, type)
        case 'EXPLORE':
            return getImageForExplore(key, type)
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

function getImageForURL(key,type){
    return {src: Icon, alt: "alt"}
}
