//import _ from 'lodash';
import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'
import SearchResults from '../search/search-results.js';
import SearchAutoCompleteList from '../search/search-autocomplete-list.js'
//import updateSearchAction from '../../actions/update-search-action.js'
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import { withRouter } from 'react-router-dom'
import {store} from '../../store.js'
import querystring from 'query-string';
import Snippet from '../snippet.js';

var md = require('markdown-it')();
var mk = require('markdown-it-katex');
md.use(mk);

const  defaultSnippet = '### Snippet is missing \n  $\\frac{1}{0}!$'


class SnippetPage extends Component {  
  render() {
    let qry = this.props.location.search;
    querystring.parse(qry)
    let parsed = querystring.parse(qry);
    var mathObject = ""
    if ("mo" in parsed) {
      mathObject = parsed.mo
      console.log(mathObject)
    } else {
      console.log("no math boject")
    }

    return (
        <div>
          <EpsilonStreamPage title="Watch" hassearch={true}>
            <center>
              <Snippet mathObject = {'#'+mathObject}/>
            </center>
          </EpsilonStreamPage>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    snippetDict: state.database.snippetDict,
  };
};

export default connect(mapStateToProps)(SnippetPage);
export {SnippetPage}
