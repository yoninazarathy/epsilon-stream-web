import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'
import SearchResults from '../search/search-results.js';
import updateSearchAction from '../../actions/update-search-action.js'
import { Button } from 'reactstrap';

class SearchPage extends Component {
  render() {
    return (
        <EpsilonStreamPage title="Search" hassearch={true}>
          <SearchResults/>
        </EpsilonStreamPage>
    );
  }
}

export default connect()(SearchPage);
export {SearchPage}
