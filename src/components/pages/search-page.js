import _ from 'lodash';
import React, { Component } from 'react';
import EpsilonStreamPage from './epsilon-stream-page.js';
import {connect} from 'react-redux'
import SearchResults from '../search/search-results.js';
import SearchAutoCompleteList from '../search/search-autocomplete-list.js'
import updateSearchAction from '../../actions/update-search-action.js'
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import randomChoiceAction from '../../actions/random-choice-action.js'
import {store} from '../../store.js'

// const LeftButton = withRouter(({history}) => (
//     <Button outline color="danger" className="ml-sm-2 mr-sm-2"
//         onClick={() => {console.log("left....")}}>
//         <img alt="left" src={LeftButtonImage} width={30} height={30} />
//     </Button>
// ))

// const RightButton = withRouter(({history}) => (
//     <Button outline color="danger" className="ml-sm-2 mr-sm-2"
//         onClick={() => {console.log("right....")}}>
//         <img alt="right" src={RightButtonImage} width={30} height={30} />
//     </Button>
// ))

const SearchButton = withRouter(({history}) => (
  <Button outline color="light" className="ml-sm-2"
      onClick={() => {history.push('/search')}}>
      Search
  </Button>
))

const SurpriseButton = withRouter(({history}) => (
  <Button outline color="light" className="ml-sm-2 mr-sm-2"
      onClick={randomChoiceAction}>
      Surprise
  </Button>
))


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

    handleSubmit(event) {
      //alert('A name was submitted: ' + this.state.value);
      //event.preventDefault();
      //store.dispatch(push('/search'))
      //history.push('/search')
    }

    handleKeyPress(event){
        console.log("key: " + event.key)
        if (event.key !== 'Enter'){
            store.dispatch({type: "USER_SEARCH_IS_TYPING",payload:{}})
            //  console.log("enter enter enter")
            //  console.log(this.state.value)
        }else{
            store.dispatch({type: "USER_SEARCH_DONE_TYPING",payload:{}})
            updateSearchAction(event.target.value)
            this.state.value = event.target.value
        }
    }




  render() {
    //const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 200);
    return (
        <EpsilonStreamPage title="Search" hassearch={true}>
          {this.props.searchTypingInProgress ? <SearchAutoCompleteList/> : <SearchResults/>}
        </EpsilonStreamPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchTypingInProgress: state.user.searchTypingInProgress,
  };
};

export default connect(mapStateToProps)(SearchPage);
export {SearchPage}
