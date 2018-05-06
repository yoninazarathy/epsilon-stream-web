//import _ from 'lodash';
import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'
import SearchResults from '../search/search-results.js';
import SearchAutoCompleteList from '../search/search-autocomplete-list.js'
//import updateSearchAction from '../../actions/update-search-action.js'
import { Button} from 'reactstrap';
//import { withRouter } from 'react-router-dom'
import {store} from '../../store.js'
import SearchBar from '../search-bar.js'


class SearchPage extends Component {
    // Search
    handleChange(event) {
      this.setState({value: event.target.value});
      if(event.target.value === ""){
        store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})
      }
      //updateSearchAction(event.target.value)
      //store.dispatch(push('?search='+event.target.value))
      //this.props.activeRouteHandler({key: "test"})
    }
  render() {
    //const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 200);
    return (
        <div>
        <EpsilonStreamPage title="Search" hassearch={true}>
            <SearchBar/>
            {this.props.searchTypingInProgress && this.props.listHasStuff 
                        ? <SearchAutoCompleteList/> : 
                          <SearchResults/>}
        </EpsilonStreamPage>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchTypingInProgress: state.user.searchTypingInProgress,
    listHasStuff: state.user.autoCompleteList.length > 0
  };
};

export default connect(mapStateToProps)(SearchPage);
export {SearchPage}
