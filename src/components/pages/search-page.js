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
import {push} from 'react-router-redux'
import querystring from 'query-string'
import updateSearchAction from '../../actions/update-search-action.js'

class SearchPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      parsedQuery: ''
    };

    if(this.props.qs !== ''){
      let qry = this.props.location.search;
      let parsed = querystring.parse(this.props.qs)
      // console.log(parsed)
      if('q' in parsed ){
        this.state.parsedQuery = parsed.q;
        updateSearchAction(this.state.parsedQuery)
      }else if('home' in parsed){
        this.state.parsedQuery = 'home';
        //updateSearchAction(this.state.parsedQuery)
      }
    }
  }


  render() {
    // console.log("sssssss")
    // console.log(this.props.qs)
    return (
        <div>
        <EpsilonStreamPage title="Search" hassearch={true}>
            <SearchBar startQuery={this.state.parsedQuery}/>
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
