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
import userHomeAction from '../../actions/user-home-action.js'
import userMathObjectAction from '../../actions/user-math-object-action.js'

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
      }else if('mo' in parsed){
        //this.state.parsedQuery = 'la la la'
        userMathObjectAction(parsed.mo)
      }else if('home' in parsed){
        this.state.parsedQuery = 'Epsilon Stream Home';
        userHomeAction()
      } else if('news' in parsed){
        this.state.parsedQuery = 'One on Epsilon';
        updateSearchAction(this.state.parsedQuery) //QQQQ make special function for it
      }else if('curious' in parsed){
        this.state.parsedQuery = 'Curious Epsilon';
        updateSearchAction(this.state.parsedQuery) //QQQQ make special function for it
      }else if('picks' in parsed){
        this.state.parsedQuery = 'Epsilon Picks';
        updateSearchAction(this.state.parsedQuery) //QQQQ make special function for it
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
            {true && this.props.listHasStuff 
                        ? <SearchAutoCompleteList/> : 
                          <SearchResults/>}
        </EpsilonStreamPage>
        </div>
    );
  }
}


export default connect(mapStateToProps)(SearchPage);
export {SearchPage}
