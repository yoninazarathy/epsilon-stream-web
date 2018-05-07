import {store} from '../store.js'
import {push} from 'react-router-redux'

export default function updateSearchURL(currentSearch){
    console.log("updating search url...")
    store.dispatch(push('/?search='+currentSearch))    
}