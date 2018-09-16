import {store} from '../store.js'
import pullCloudKitData from '../managers/cloudkit-manager.js'

export default function startCloudPullAction(actionType){
    if(actionType === "FULL_PULL"){
      //console.log('will do full pull')
      function sanitizedforindemnity(lst) {
        let name = lst[0]
        // console.log(name)
        let query = makeQuery(name)
        pullCloudKitData(query,
            (result) =>{
                //console.log(result)
                store.dispatch({type:"FETCH_"+name+"_STOP",
                                success: true, 
                                payload: result})
                if (lst.length !== 1) {
                  sanitizedforindemnity(lst.slice(1))
              }
            })
          }
          sanitizedforindemnity(["FEATURED_URL", "MATH_OBJECT", "MATH_OBJECT_LINK", "VIDEO","SNIPPET"])
    }else{
      let query = makeQuery(actionType)
      pullCloudKitData(query,
          (result) => {
              //console.log(result)
              store.dispatch({type:"FETCH_"+actionType+"_STOP",
                              success: true, 
                              payload: result})
          })
  }
}

function makeQuery(actionType){
    
      var query = {};//{ recordType: 'MathObject', sortBy: [{ fieldName: 'hashTag'}] };
    
    let inVideoCollection = {fieldName: 'isInVideoCollection', //Used by VIDEO 
                            comparator: 'EQUALS',
                            fieldValue: {value: 1}};
    let inCollection = {...inVideoCollection,
                            fieldName: 'isInCollection'}     //Used by FeaturedURL, MO and MOL

      switch(actionType){
        case "MATH_OBJECT":
          query = { recordType: 'MathObject'};//,filterBy: [inCollection]}//, sortBy: [{ fieldName: 'hashTag'}] };
          break;
        case "VIDEO":
          query = { recordType: 'Video',filterBy: [inVideoCollection]};
          break;
        case "FEATURED_URL":
          query = { recordType: 'FeaturedURL',  filterBy: [inCollection]  };
          break;
        case "MATH_OBJECT_LINK":
          query = { recordType: 'MathObjectLinks',  filterBy: [inCollection] };
          break;
        case "SNIPPET":
          query = { recordType: 'Snippet'};
          break;
          default:
            return;
      }
      return query;
    }