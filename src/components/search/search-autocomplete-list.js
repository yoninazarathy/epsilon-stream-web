import React, { Component } from 'react';
import {connect} from 'react-redux'
//import { Button} from 'reactstrap';
import updateSearchAction from '../../actions/update-search-action.js'

class SearchAutoCompleteList extends Component {
  render(){
    return(
        <div className="SearchAutoCompleteList">
            <ul>
              <div className="AutoCompleteElement">
                {this.props.autoCompleteList.map((item,i) => <li key={i}>
                  <button className="AutoCompleteButton" 
                          onClick={()=>{updateSearchAction(item)}}
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
    return {
      autoCompleteList: state.user.autoCompleteList
    };
  };



export default connect(mapStateToProps)(SearchAutoCompleteList);
export {SearchAutoCompleteList}
