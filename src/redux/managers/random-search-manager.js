import store from '../store.js'

export default function randomSearchResult(){
    let mos = store.getState().database.mathObjects
    let index = Math.floor(Math.random()*mos.length)
    let rawTitles = mos[index].associatedTitles
    let aa = rawTitles.split("~")[0].split("$") //QQQQ do once when loading
    // console.log(rawTitles)
    // console.log(aa)
    // console.log(aa[1])
    let cleanTitle = aa[1]  //QQQQ ugly unsafe code!
    return cleanTitle
}

