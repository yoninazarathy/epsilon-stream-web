import React, { Component } from 'react';
import {connect} from 'react-redux'
//import { Button} from 'reactstrap';
// import updateSearchAction from '../../actions/update-search-action.js'

class SearchAutoCompleteListX extends Component {
  render(){
    return(
        <div className="SearchAutoCompleteList">
            <ul>
              <div className="AutoCompleteElement">
                {this.props.autoCompleteList.map((item,i) => <li key={i}>
                  <button className="AutoCompleteButton" 
                          onClick={()=>{console.log(item)/*updateSearchAction(item)*/}}
                        >
                        {item}
                    </button></li>)
                  }
              </div>
            </ul>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("here...")
  console.log(state.user)
    return {
      autoCompleteList: state.user.autoCompleteList
    };
  };

const SearchAutoCompleteList = connect(mapStateToProps)(SearchAutoCompleteListX);
export {SearchAutoCompleteList}
