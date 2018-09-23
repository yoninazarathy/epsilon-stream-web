import React, { Component } from 'react';
import {connect} from 'react-redux'
//import { Button} from 'reactstrap';
import updateSearchAction from '../../redux/actions/update-search-action'
import { withRouter } from 'react-router-dom'

class SearchAutoCompleteListX extends Component {
  render(){
    return(
        <div className="SearchAutoCompleteList">
            <ul>
              <div className="AutoCompleteElement">
                {this.props.autoCompleteList.map((item,i) => <li key={i}>
                  <button className="AutoCompleteButton" 
                          onClick={()=>{updateSearchAction(item,this.props.history)}}
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

const SearchAutoCompleteList = withRouter(connect(mapStateToProps)(SearchAutoCompleteListX));
export {SearchAutoCompleteList}
