//import _ from 'lodash';
import React, { Component } from 'react';
import EpsilonStreamPage from '../../new-components/pages/epsilon-stream-page';
// import {connect} from 'react-redux'
import SearchResults from '../../new-components/search/search-results.js';
// import SearchAutoCompleteList from '../search/search-autocomplete-list.js'
//import updateSearchAction from '../../actions/update-search-action.js'
// import { Button} from 'reactstrap';
//import { withRouter } from 'react-router-dom'
// import {store} from '../../store.js'
// import SearchBar from '../search-bar.js'
// import {push} from 'react-router-redux'
// import querystring from 'query-string'
// import updateSearchAction from '../../actions/update-search-action.js'
// import userHomeAction from '../../actions/user-home-action.js'
// import userMathObjectAction from '../../actions/user-math-object-action.js'

import { withRouteData } from 'react-static'

class SearchPage extends Component {
  constructor(props){
    super(props);
  }


  render() {
    console.log(this.props)
    return (
        <div>
        <EpsilonStreamPage title="Search" hassearch={true}>
            {/*<SearchBar startQuery={this.state.parsedQuery}/>*/}
            <SearchResults searchItem={this.props.searchItem} />
        </EpsilonStreamPage>
        </div>
    );
  }
}


export default withRouteData(SearchPage);
